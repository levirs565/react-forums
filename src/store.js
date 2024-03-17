import { configureStore } from "@reduxjs/toolkit";
import auth, { listenerMiddleware } from "./slices/auth";
import threads from "./slices/threads";
import threadDetail from "./slices/threadDetail";

export const store = configureStore({
  reducer: {
    auth,
    threads,
    threadDetail,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
