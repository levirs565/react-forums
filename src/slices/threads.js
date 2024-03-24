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
import { getData } from "../api";
import {
  downVoteThread,
  neutralizeVoteThread,
  upVoteThread,
} from "./threadsVote";

export const updateThreads = createAsyncThunk(
  "threads/update",
  async () => (await getData("/threads")).threads
);

export const updateThreadsUsers = createAsyncThunk(
  "threads/updateUsers",
  async () => (await getData("/users")).users
);

const slice = createSlice({
  name: "threads",
  initialState: {
    threads: {
      ...createProcessState(),
      list: null,
    },
    users: {
      ...createProcessState(),
      list: null,
    },
    categoryFilter: null,
  },
  reducers: {
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(
      builder,
      updateThreads,
      "threads",
      (state, action) => {
        state.threads.list = action.payload;
      }
    );

    syncStateWithAsyncThunk(
      builder,
      updateThreadsUsers,
      "users",
      (state, action) => {
        state.users.list = action.payload;
      }
    );
    builder.addCase(upVoteThread.fulfilled, (state, action) => {
      const thread = findThread(state.threads.list, action.payload.threadId);
      if (thread) upVoteEntity(thread, action.payload.userId);
    });
    builder.addCase(downVoteThread.fulfilled, (state, action) => {
      const thread = findThread(state.threads.list, action.payload.threadId);
      if (thread) downVoteEntity(thread, action.payload.userId);
    });
    builder.addCase(neutralizeVoteThread.fulfilled, (state, action) => {
      const thread = findThread(state.threads.list, action.payload.threadId);
      if (thread) neutralizeVoteEntity(thread, action.payload.userId);
    });
  },
});

const selectCurrentState = (state) => state.threads;

export const selectThreadsList = createSelector(
  [selectCurrentState],
  ({ threads, users, categoryFilter }) => {
    if (threads.loading || users.loading)
      return {
        loading: true,
        error: null,
      };
    if (threads.error)
      return {
        loading: false,
        error: threads.error,
      };
    if (users.error)
      return {
        loading: false,
        error: users.error,
      };
    const userList = users.list;
    const threadList = threads.list;
    let list = threadList.map(({ ownerId, ...rest }) => ({
      owner: userList.find(({ id }) => id === ownerId),
      ...rest,
    }));
    if (categoryFilter)
      list = list.filter(({ category }) => category === categoryFilter);
    return {
      loading: false,
      error: null,
      list,
    };
  }
);

export const selectCategoryList = createSelector(
  [(state) => selectCurrentState(state).threads],
  ({ list }) => {
    return Array.from(new Set((list ?? []).map(({ category }) => category)));
  }
);

export const selectThreadListCategoryFilter = (state) =>
  selectCurrentState(state).categoryFilter;
export const setThreadListCategoryFilter = slice.actions.setCategoryFilter;

export default slice.reducer;
