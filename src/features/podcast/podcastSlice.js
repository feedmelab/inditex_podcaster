import { createSlice } from "@reduxjs/toolkit";
import { applyFilter } from "../../utils/utils";
import { fetchPodcasts, fetchPodcastDetails } from "../../actions/fetchActions";

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
    page: 1,
  },
  reducers: {
    updateFilter: (state, action) => {
      state.filter = action.payload;
      state.filteredPodcasts = applyFilter(state.podcasts, state.filter);
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    addPodcasts: (state, action) => {
      // Fusionar los podcasts existentes con los nuevos podcasts
      state.podcasts = [...state.podcasts, ...action.payload];
      state.filteredPodcasts = applyFilter(state.podcasts, state.filter);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPodcasts.pending, (state) => {
        state.status = "loading";
        state.podcastDetails = null;
      })
      .addCase(fetchPodcasts.fulfilled, (state, action) => {
        let oneHourAgo = Date.now() - 60 * 60 * 1000;
        state.podcastDetails = null;
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
        state.podcastDetails = null;
        state.error = action.error.message;
      })
      .addCase(fetchPodcastDetails.pending, (state) => {
        state.isFetchingDetails = true;
        state.podcastDetails = null;
      })
      .addCase(fetchPodcastDetails.fulfilled, (state, action) => {
        state.isFetchingDetails = false;
        state.podcastDetails = action.payload;

        const podcastId = action.meta.arg;

        const cachedDetails = state.podcastDetailsCache[podcastId];
        //const currentDate = new Date().toDateString();

        const lastFetchedDate = new Date(cachedDetails?.lastFetchDate);

        const currentDate = new Date();

        const diffInHours = Math.abs(currentDate - lastFetchedDate) / 36e5;

        state.podcastDetails = action.payload;

        if (cachedDetails && diffInHours < 1) {
          state.podcastDetails = cachedDetails.details;
        } else {
          state.podcastDetailsCache[podcastId] = {
            lastFetchDate: currentDate.toISOString(),
            details: action.payload,
            summary: action.payload.summary,
            podcastDetails: action.payload.podcastDetails,
          };
          state.summary = action.payload.summary;
        }
      })
      .addCase(fetchPodcastDetails.rejected, (state) => {
        state.isFetchingDetails = false;
      });
  },
});

export const { updateFilter, setPage } = podcastSlice.actions;

export default podcastSlice.reducer;
