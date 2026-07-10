import { configureStore } from "@reduxjs/toolkit";
import { contentfulApi } from "../services/contentfulApi";

export const store = configureStore({
  reducer: {
    [contentfulApi.reducerPath]: contentfulApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contentfulApi.middleware),
});
