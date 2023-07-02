import { configureStore } from "@reduxjs/toolkit";
import podcastReducer from "../features/podcast/podcastSlice";

const store = configureStore({
  reducer: {
    podcast: podcastReducer,
  },
});

export default store;
