<<<<<<< HEAD
<<<<<<< HEAD
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPodcastDetails = createAsyncThunk(
  'podcast/fetchPodcastDetails',
  async (podcastId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
        )}`
      );

      if (!response.ok) {
        throw new Error('Server response was not ok.');
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
  'podcast/fetchPodcasts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://corsproxy.io/?${encodeURIComponent(
          `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
        )}`
      );

      if (!response.ok) {
        throw new Error('Server response was not ok.');
      }

      const data = await response.json();
      const parsedData = JSON.parse(data.contents);
      return parsedData.feed.entry.map((entry) => ({
        id: entry.id.attributes['im:id'],
        summary: entry.summary?.label || '',
        'im:name': { label: entry['im:name'].label },
        'im:artist': { label: entry['im:artist'].label },
        'im:image': entry['im:image'].map((image) => ({
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
    const name = podcast['im:name'].label.toLowerCase();
    const artist = podcast['im:artist'].label.toLowerCase();
    return name.includes(normalizedFilter) || artist.includes(normalizedFilter);
  });
};
=======
=======
>>>>>>> e167561aa1606e8f8543e62ac66e77f84161dd53
import { createSlice } from '@reduxjs/toolkit';
import { applyFilter, isWithinAnHour } from '../../utils/utils.js';
import {
  fetchPodcasts,
  fetchPodcastDetails,
} from '../../actions/fetchActions.js';
<<<<<<< HEAD
>>>>>>> e167561aa1606e8f8543e62ac66e77f84161dd53
=======
>>>>>>> e167561aa1606e8f8543e62ac66e77f84161dd53

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
<<<<<<< HEAD
<<<<<<< HEAD
      })
      .addCase(fetchPodcasts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.podcasts = action.payload;
        state.lastFetch = Date.now();
        state.filteredPodcasts = applyFilter(action.payload, state.filter);
      })
      .addCase(fetchPodcasts.rejected, (state, action) => {
        state.status = 'failed';
=======
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
>>>>>>> e167561aa1606e8f8543e62ac66e77f84161dd53
=======
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
>>>>>>> e167561aa1606e8f8543e62ac66e77f84161dd53
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
