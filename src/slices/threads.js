import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  createAddVoteReducer,
  createProcessState,
  downVoteEntity,
  findThread,
  neutralizeVoteEntity,
  syncStateWithAsyncThunk,
  upVoteEntity,
} from './utils';
import { getData } from '../api';
import {
  downVoteThread,
  neutralizeVoteThread,
  upVoteThread,
} from './threadsVote';

export const updateThreads = createAsyncThunk(
  'threads/update',
  async () => (await getData('/threads')).threads,
);

export const updateThreadsUsers = createAsyncThunk(
  'threads/updateUsers',
  async () => (await getData('/users')).users,
);

const slice = createSlice({
  name: 'threads',
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
      'threads',
      (state, action) => {
        state.threads.list = action.payload;
      },
    );

    syncStateWithAsyncThunk(
      builder,
      updateThreadsUsers,
      'users',
      (state, action) => {
        state.users.list = action.payload;
      },
    );

    const addVoteReducer = createAddVoteReducer(
      (state, action) => findThread(state.threads.list, action.meta.arg.id),
    );
    addVoteReducer(builder, upVoteThread, upVoteEntity);
    addVoteReducer(builder, downVoteThread, downVoteEntity);
    addVoteReducer(builder, neutralizeVoteThread, neutralizeVoteEntity);
  },
});

const selectCurrentState = (state) => state.threads;

export const selectRawThreads = (state) => selectCurrentState(state).threads;

export const selectThreadsList = createSelector(
  [selectCurrentState],
  ({ threads, users, categoryFilter }) => {
    if (threads.loading || users.loading) {
      return {
        loading: true,
        error: null,
      };
    }
    if (threads.error) {
      return {
        loading: false,
        error: threads.error,
      };
    }
    if (users.error) {
      return {
        loading: false,
        error: users.error,
      };
    }
    const userList = users.list;
    const threadList = threads.list;
    let list = threadList.map(({ ownerId, ...rest }) => ({
      owner: userList.find(({ id }) => id === ownerId),
      ...rest,
    }));
    if (categoryFilter) list = list.filter(({ category }) => category === categoryFilter);
    return {
      loading: false,
      error: null,
      list,
    };
  },
);

export const selectCategoryList = createSelector(
  [(state) => selectCurrentState(state).threads],
  ({ list }) => Array.from(new Set((list ?? []).map(({ category }) => category))),
);

export const selectThreadListCategoryFilter = (state) => selectCurrentState(state).categoryFilter;
export const setThreadListCategoryFilter = slice.actions.setCategoryFilter;

export default slice.reducer;
