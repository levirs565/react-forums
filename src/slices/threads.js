import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProcessState,
  downVoteEntity,
  findThread,
  neutralizeVoteEntity,
  syncStateWithAsyncThunk,
  upVoteEntity,
} from "./utils";
import { getData, postData } from "../api";

export const updateThreads = createAsyncThunk(
  "threads/update",
  async () => (await getData("/threads")).threads
);

export const upVoteThread = createAsyncThunk(
  "threads/upVoteThread",
  async ({ id }) => (await postData(`/threads/${id}/up-vote`, {})).vote
);

export const downVoteThread = createAsyncThunk(
  "threads/downVoteThread",
  async ({ id }) => (await postData(`/threads/${id}/down-vote`, {})).vote
);

export const neutralizeVoteThread = createAsyncThunk(
  "threads/neutralizeVoteThread",
  async ({ id }) => (await postData(`/threads/${id}/neutral-vote`, {})).vote
);

const slice = createSlice({
  name: "threads",
  initialState: createProcessState(),
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(builder, updateThreads, null, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(upVoteThread.fulfilled, (state, action) => {
      const thread = findThread(state.list, action.payload.threadId);
      if (thread) upVoteEntity(thread, action.payload.userId);
    });
    builder.addCase(downVoteThread.fulfilled, (state, action) => {
      const thread = findThread(state.list, action.payload.threadId);
      if (thread) downVoteEntity(thread, action.payload.userId);
    });
    builder.addCase(neutralizeVoteThread.fulfilled, (state, action) => {
      const thread = findThread(state.list, action.payload.threadId);
      if (thread) neutralizeVoteEntity(thread, action.payload.userId);
    });
  },
});

export const selectThreadsList = (state) => state.threads;

export default slice.reducer;
