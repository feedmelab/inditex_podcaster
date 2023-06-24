import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import podcastsSlice from "../features/podcast/podcastSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["podcasts"],
  throttle: 60 * 60 * 1000,
};

const persistedReducer = persistReducer(persistConfig, podcastsSlice);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
