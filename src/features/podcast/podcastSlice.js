import { createSlice } from "@reduxjs/toolkit";

const podcastSlice = createSlice({
  name: "podcasts",
  initialState: {
    podcasts: [],
    lastRequestDate: null,
    isLoading: false,
    filterText: "",
  },
  reducers: {
    setPodcasts: (state, action) => {
      state.podcasts = action.payload;
    },
    setLastRequestDate: (state, action) => {
      state.lastRequestDate = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
  },
});

export const fetchPodcasts = () => async (dispatch, getState) => {
  const lastRequestDate = getState().podcasts.lastRequestDate;
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;

  // si los datos son de hace menos de 24 horas, no hacer nada
  if (lastRequestDate > oneDayAgo) {
    return;
  }

  dispatch(setLoading(true));

  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`
    );
    const data = await response.json();

    const feedList = JSON.parse(data.contents);
    const entryList = feedList.feed.entry;
    console.log(entryList);
    dispatch(setPodcasts(entryList));
    dispatch(setLastRequestDate(Date.now()));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const { setPodcasts, setLastRequestDate, setLoading, setFilterText } =
  podcastSlice.actions;

export default podcastSlice.reducer;
