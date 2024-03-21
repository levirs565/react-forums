import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, postData } from "../api";
import {
  createProcessState,
  downVoteEntity,
  neutralizeVoteEntity,
  syncStateWithAsyncThunk,
  upVoteEntity,
} from "./utils";
import { downVoteThread, neutralizeVoteThread, upVoteThread } from "./threads";

export const updateThreadDetail = createAsyncThunk(
  "threadDetail/update",
  async ({ id }) => (await getData(`/threads/${id}`)).detailThread
);

export const addComment = createAsyncThunk(
  "threadDetail/addComment",
  async ({ threadId, content }) =>
    (await postData(`/threads/${threadId}/comments`, { content })).comment
);

export const upVoteComment = createAsyncThunk(
  "threadDetail/upVoteComment",
  async ({ threadId, commentId }) =>
    (await postData(`/threads/${threadId}/comments/${commentId}/up-vote`, {}))
      .vote
);

export const downVoteComment = createAsyncThunk(
  "threadDetail/downVoteComment",
  async ({ threadId, commentId }) =>
    (await postData(`/threads/${threadId}/comments/${commentId}/down-vote`, {}))
      .vote
);

export const neutralizeVoteComment = createAsyncThunk(
  "threadDetail/neutralVoteComment",
  async ({ threadId, commentId }) =>
    (
      await postData(
        `/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {}
      )
    ).vote
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
    builder.addCase(upVoteThread.fulfilled, (state, action) => {
      if (action.payload.threadId != state.detail.detail.id) return;
      upVoteEntity(state.detail.detail, action.payload.userId);
    });
    builder.addCase(downVoteThread.fulfilled, (state, action) => {
      if (action.payload.threadId != state.detail.detail.id) return;
      downVoteEntity(state.detail.detail, action.payload.userId);
    });
    builder.addCase(neutralizeVoteThread.fulfilled, (state, action) => {
      if (action.payload.threadId != state.detail.detail.id) return;
      neutralizeVoteEntity(state.detail.detail, action.payload.userId);
    });
    builder.addCase(upVoteComment.fulfilled, (state, action) => {
      const comment = state.detail.detail.comments.find(
        (comment) => comment.id === action.payload.commentId
      );
      if (comment) upVoteEntity(comment, action.payload.userId);
    });
    builder.addCase(downVoteComment.fulfilled, (state, action) => {
      const comment = state.detail.detail.comments.find(
        (comment) => comment.id === action.payload.commentId
      );
      if (comment) downVoteEntity(comment, action.payload.userId);
    });
    builder.addCase(neutralizeVoteComment.fulfilled, (state, action) => {
      const comment = state.detail.detail.comments.find(
        (comment) => comment.id === action.payload.commentId
      );
      if (comment) neutralizeVoteEntity(comment, action.payload.userId);
    });
  },
});

export const selectThreadDetail = (state) => state.threadDetail.detail;
export const selectAddCommentState = (state) => state.threadDetail.addComment;

export default slice.reducer;
