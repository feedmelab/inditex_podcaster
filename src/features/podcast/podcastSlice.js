import { createSlice } from '@reduxjs/toolkit';
import { applyFilter, isWithinAnHour } from '../../utils/utils.js';
import {
  fetchPodcasts,
  fetchPodcastDetails,
} from '../../actions/fetchActions.js';

const podcastSlice = createSlice({
  name: 'podcast',
  initialState: {
    podcasts: [],
    status: 'idle',
    error: null,
    lastFetch: null,
    filter: '',
    filteredPodcasts: [],
    isFetchingDetails: false,
    podcastDetails: null,
    podcastDetailsCache: {},
    summary: null,
    page: 0,
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
        state.status = 'loading';
        state.podcastDetails = null;
      })
      .addCase(fetchPodcasts.fulfilled, (state, action) => {
        if (state.lastFetch && isWithinAnHour(state.lastFetch)) {
          state.filteredPodcasts = applyFilter(state.podcasts, state.filter);
        } else {
          // Download and cache the new podcasts
          state.podcasts = action.payload;
          state.lastFetch = new Date().toISOString();
          state.filteredPodcasts = applyFilter(action.payload, state.filter);
        }
        state.status = 'succeeded';
      })
      .addCase(fetchPodcasts.rejected, (state, action) => {
        state.status = 'failed';
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

        if (cachedDetails && isWithinAnHour(cachedDetails.lastFetchDate)) {
          state.podcastDetails = cachedDetails.details;
        } else {
          state.podcastDetailsCache[podcastId] = {
            lastFetchDate: new Date().toISOString(),
            details: action.payload,
            summary: action.payload.summary,
            podcastDetails: action.payload.podcastDetails,
          };
          state.summary = action.payload.summary;
          state.podcastDetails = action.payload;
        }
      })
      .addCase(fetchPodcastDetails.rejected, (state) => {
        state.isFetchingDetails = false;
      });
  },
});

export const { updateFilter, setPage } = podcastSlice.actions;

export default podcastSlice.reducer;
