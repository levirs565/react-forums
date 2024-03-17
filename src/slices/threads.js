import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProcessState, syncStateWithAsyncThunk } from "./utils";
import { getData } from "../api";

export const updateThreads = createAsyncThunk(
  "threads/update",
  async () => (await getData("/threads")).threads
);

const slice = createSlice({
  name: "threads",
  initialState: createProcessState(),
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(builder, updateThreads, null, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const selectedThreadsList = (state) => state.threads;

export default slice.reducer;
