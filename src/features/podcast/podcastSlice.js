import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchPodcastDetails = createAsyncThunk(
  "podcast/fetchPodcastDetails",
  async (podcastId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
        )}`
      );

      if (!response.ok) {
        throw new Error("Server response was not ok.");
      }

      const data = await response.json();
      const parsedData = JSON.parse(data.contents);
      return parsedData.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPodcasts = createAsyncThunk(
  "podcast/fetchPodcasts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
        )}`
      );

      if (!response.ok) {
        throw new Error("Server response was not ok.");
      }

      const data = await response.json();
      const parsedData = JSON.parse(data.contents);
      return parsedData.feed.entry.map((entry) => ({
        id: entry.id.attributes["im:id"],
        summary: entry.summary?.label || "",
        "im:name": { label: entry["im:name"].label },
        "im:artist": { label: entry["im:artist"].label },
        "im:image": entry["im:image"].map((image) => ({
          label: image.label,
          attributes: { height: image.attributes.height },
        })),
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const applyFilter = (podcasts, filterValue) => {
  const normalizedFilter = filterValue.toLowerCase();
  return podcasts.filter((podcast) => {
    const name = podcast["im:name"].label.toLowerCase();
    const artist = podcast["im:artist"].label.toLowerCase();
    return name.includes(normalizedFilter) || artist.includes(normalizedFilter);
  });
};

const podcastSlice = createSlice({
  name: "podcast",
  initialState: {
    podcasts: [],
    status: "idle",
    error: null,
    lastFetch: null,
    filter: "",
    filteredPodcasts: [],
    isFetchingDetails: false,
    podcastDetails: null,
    podcastDetailsCache: {},
    summary: null,
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
      state.filteredPodcasts = applyFilter(state.podcasts, state.filter);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPodcasts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPodcasts.fulfilled, (state, action) => {
        let oneHourAgo = Date.now() - 60 * 60 * 1000;

        if (state.lastFetch > oneHourAgo) {
          state.filteredPodcasts = applyFilter(state.podcasts, state.filter);
        } else {
          // Descargamos y almacenamos los nuevos podcasts en la caché
          state.podcasts = action.payload;
          state.lastFetch = Date.now();
          state.filteredPodcasts = applyFilter(action.payload, state.filter);
        }
        state.status = "succeeded";
      })
      .addCase(fetchPodcasts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPodcastDetails.pending, (state) => {
        state.isFetchingDetails = true;
      })
      .addCase(fetchPodcastDetails.fulfilled, (state, action) => {
        state.isFetchingDetails = false;
        state.podcastDetails = action.payload;

        const podcastId = action.meta.arg;
        // Comprobamos si los detalles del podcast están en la caché
        const cachedDetails = state.podcastDetailsCache[podcastId];
        const currentDate = new Date().toDateString();

        if (cachedDetails && cachedDetails.lastFetchDate === currentDate) {
          // Utilizamos los detalles almacenados en la caché
          state.podcastDetails = cachedDetails.details;
        } else {
          // Almacenamos los nuevos detalles en la caché
          state.podcastDetailsCache[podcastId] = {
            lastFetchDate: currentDate,
            details: action.payload,
            summary: action.payload.summary,
            podcastDetails: action.payload.podcastDetails,
          };
          state.summary = action.payload.summary;
          state.podcastDetails = action.payload.podcastDetails;
        }
      })
      .addCase(fetchPodcastDetails.rejected, (state) => {
        state.isFetchingDetails = false;
      });
  },
});

export const { updateFilter } = podcastSlice.actions;

export default podcastSlice.reducer;
