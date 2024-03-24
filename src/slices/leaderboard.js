import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProcessState, syncStateWithAsyncThunk } from './utils';
import { getData } from '../api';

export const updateLeaderboard = createAsyncThunk(
  'leaderboard/update',
  async () => (await getData('/leaderboards')).leaderboards,
);

const slice = createSlice({
  name: 'leaderboard',
  initialState: createProcessState(),
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(
      builder,
      updateLeaderboard,
      null,
      (state, action) => {
        state.list = action.payload;
      },
    );
  },
});

export const selectLeaderboards = (state) => state.leaderboard;

export default slice.reducer;
