import { configureStore } from "@reduxjs/toolkit";
import threads from "./slices/threads";
import threadDetail from "./slices/threadDetail";

export const store = configureStore({
  reducer: {
    threads,
    threadDetail,
  },
});
