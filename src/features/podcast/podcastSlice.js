import { createSlice } from "@reduxjs/toolkit";

import {
  applyFilter,
  fetchPodcastDetails,
  fetchPodcasts,
} from "../../utils/utils";


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
    downloadProgress: 0,
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
          // state.podcastDetails = action.payload.podcastDetails;
        }
      })
      .addCase(fetchPodcastDetails.rejected, (state) => {
        state.isFetchingDetails = false;
      });
  },
});

export const { updateFilter } = podcastSlice.actions;

export default podcastSlice.reducer;
