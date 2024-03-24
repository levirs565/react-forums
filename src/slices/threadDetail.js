import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData, postData } from "../api";
import {
  createAddVoteReducer,
  createProcessState,
  downVoteEntity,
  getUserIdMeta,
  neutralizeVoteEntity,
  syncStateWithAsyncThunk,
  upVoteEntity,
} from "./utils";
import {
  downVoteThread,
  neutralizeVoteThread,
  upVoteThread,
} from "./threadsVote";

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
      .vote,
  {
    getPendingMeta: getUserIdMeta,
  }
);

export const downVoteComment = createAsyncThunk(
  "threadDetail/downVoteComment",
  async ({ threadId, commentId }) =>
    (await postData(`/threads/${threadId}/comments/${commentId}/down-vote`, {}))
      .vote,

  {
    getPendingMeta: getUserIdMeta,
  }
);

export const neutralizeVoteComment = createAsyncThunk(
  "threadDetail/neutralVoteComment",
  async ({ threadId, commentId }) =>
    (
      await postData(
        `/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {}
      )
    ).vote,
  {
    getPendingMeta: getUserIdMeta,
  }
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

    const addVoteReducer = createAddVoteReducer((state, action) =>
      action.meta.arg.id === state.detail?.detail?.id
        ? state.detail.detail
        : null
    );
    addVoteReducer(builder, upVoteThread, upVoteEntity);
    addVoteReducer(builder, downVoteThread, downVoteEntity);
    addVoteReducer(builder, neutralizeVoteThread, neutralizeVoteEntity);

    const addCommentVoteReducer = createAddVoteReducer((state, action) =>
      action.meta.arg.threadId === state.detail?.detail?.id
        ? state.detail.detail.comments.find(
            (comment) => comment.id === action.meta.arg.commentId
          )
        : null
    );
    addCommentVoteReducer(builder, upVoteComment, upVoteEntity);
    addCommentVoteReducer(builder, downVoteComment, downVoteEntity);
    addCommentVoteReducer(builder, neutralizeVoteComment, neutralizeVoteEntity);
  },
});

export const selectThreadDetail = (state) => state.threadDetail.detail;
export const selectAddCommentState = (state) => state.threadDetail.addComment;

export default slice.reducer;
