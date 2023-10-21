import { configureStore } from '@reduxjs/toolkit';
import podcastReducer from '../features/podcast/podcastSlice.js';

const store = configureStore({
  reducer: {
    podcast: podcastReducer,
  },
});

export default store;
