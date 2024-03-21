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
    builder.addCase(upVoteComment.fulfilled, (state, action) => {
      const comment = state.detail.detail.comments.find(
        (comment) => comment.id === action.payload.commentId
      );
      if (comment) {
        if (!comment.upVotesBy.includes(action.payload.userId))
          comment.upVotesBy.push(action.payload.userId);
        const index = comment.downVotesBy.indexOf(action.payload.userId);
        if (index >= 0) {
          comment.downVotesBy.splice(index, 1);
        }
      }
    });
    builder.addCase(downVoteComment.fulfilled, (state, action) => {
      const comment = state.detail.detail.comments.find(
        (comment) => comment.id === action.payload.commentId
      );
      if (comment) {
        if (!comment.downVotesBy.includes(action.payload.userId))
          comment.downVotesBy.push(action.payload.userId);
        const index = comment.upVotesBy.indexOf(action.payload.userId);
        if (index >= 0) comment.upVotesBy.splice(index, 1);
      }
    });
  },
});

export const selectThreadDetail = (state) => state.threadDetail.detail;
export const selectAddCommentState = (state) => state.threadDetail.addComment;

export default slice.reducer;
