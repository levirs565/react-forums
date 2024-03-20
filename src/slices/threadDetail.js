import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, postData } from "../api";
import { createProcessState, syncStateWithAsyncThunk } from "./utils";

export const updateThreadDetail = createAsyncThunk(
  "threadDetail/update",
  async ({ id }) => (await getData(`/threads/${id}`)).detailThread
);

export const addComment = createAsyncThunk(
  "threadDetail/addComment",
  async ({ threadId, content }) =>
    (await postData(`/threads/${threadId}/comments`, { content })).comment
);

const slice = createSlice({
  name: "threadDetail",
  initialState: {
    detail: createProcessState(),
    addComment: createProcessState(false),
  },
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(
      builder,
      updateThreadDetail,
      "detail",
      (state, action) => {
        state.detail.detail = action.payload;
      }
    );
    syncStateWithAsyncThunk(
      builder,
      addComment,
      "addComment",
      (state, action) => {
        state.detail.detail.comments.unshift(action.payload);
      }
    );
  },
});

export const selectThreadDetail = (state) => state.threadDetail.detail;
export const selectAddCommentState = (state) => state.threadDetail.addComment;

export default slice.reducer;
