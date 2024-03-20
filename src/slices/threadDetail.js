import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../api";
import { createProcessState, syncStateWithAsyncThunk } from "./utils";

export const updateThreadDetail = createAsyncThunk(
  "threadDetail/update",
  async ({ id }) => (await getData(`/threads/${id}`)).detailThread
);

const slice = createSlice({
  name: "threadDetail",
  initialState: createProcessState(),
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(
      builder,
      updateThreadDetail,
      null,
      (state, action) => {
        state.detail = action.payload;
      }
    );
  },
});

export const selectThreadDetail = (state) => state.threadDetail;

export default slice.reducer;
