import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import podcastReducer from "../features/podcast/podcastSlice";

const store = configureStore({
  reducer: {
    podcast: podcastReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
