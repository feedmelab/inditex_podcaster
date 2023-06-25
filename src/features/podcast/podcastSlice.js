import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPodcasts = createAsyncThunk(
  "podcast/fetchPodcasts",
  async () => {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`
    );
    const data = await response.json();
    const parsedData = JSON.parse(data.contents);
    //return parsedData.feed.entry;
    return parsedData.feed.entry.map((entry) => ({
      "im:name": { label: entry["im:name"].label },
      "im:artist": { label: entry["im:artist"].label },
      "im:image": entry["im:image"].map((image) => ({
        label: image.label,
        attributes: { height: image.attributes.height },
      })),
    }));
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
        state.status = "succeeded";
        state.podcasts = action.payload;
        state.lastFetch = Date.now();
        state.filteredPodcasts = applyFilter(action.payload, state.filter);
      })
      .addCase(fetchPodcasts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateFilter } = podcastSlice.actions;

export default podcastSlice.reducer;
