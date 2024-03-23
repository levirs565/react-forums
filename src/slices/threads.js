import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createProcessState,
  downVoteEntity,
  findThread,
  neutralizeVoteEntity,
  syncStateWithAsyncThunk,
  upVoteEntity,
} from "./utils";
import { getData, postData } from "../api";
import { selectUsersList } from "./users";

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

export const selectRawThreadsList = (state) => state.threads;

export const selectThreadsList = createSelector(
  [selectRawThreadsList, selectUsersList],
  (rawThreadList, userListState) => {
    if (rawThreadList.loading || userListState.loading)
      return {
        loading: true,
        error: null,
      };
    if (rawThreadList.error)
      return {
        loading: false,
        error: rawThreadList.error,
      };
    if (userListState.error)
      return {
        loading: false,
        error: userListState.error,
      };
    const userList = userListState.list;
    const threadList = rawThreadList.list;
    return {
      loading: false,
      error: null,
      list: threadList.map(({ ownerId, ...rest }) => ({
        owner: userList.find(({ id }) => id === ownerId),
        ...rest,
      })),
    };
  }
);

export default slice.reducer;
