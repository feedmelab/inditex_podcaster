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
    return parsedData.feed.entry;
  }
);

const podcastSlice = createSlice({
  name: "podcast",
  initialState: {
    podcasts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    filterPodcasts: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPodcasts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPodcasts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.podcasts = state.podcasts.concat(action.payload);
      })
      .addCase(fetchPodcasts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { filterPodcasts } = podcastSlice.actions;

export default podcastSlice.reducer;
