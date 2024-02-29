import { configureStore } from "@reduxjs/toolkit";
import threads from "./slices/threads";

export const store = configureStore({
  reducer: {
    threads,
  },
});
