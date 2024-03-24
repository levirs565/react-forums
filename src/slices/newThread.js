import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProcessState, syncStateWithAsyncThunk } from './utils';
import { postData } from '../api';

export const submitNewThread = createAsyncThunk(
  'newThread/newThread',
  async ({ title, body, category }) => (await postData('/threads', { title, body, category })).thread,
);

const slice = createSlice({
  name: 'newThread',
  initialState: {
    newId: null,
    ...createProcessState(false),
  },
  reducers: {
    cleanState: () => ({
      newId: null,
      ...createProcessState(false),
    }),
  },
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(builder, submitNewThread, null, (state, action) => {
      state.newId = action.payload.id;
    });
  },
});

export const selectNewThreadState = (state) => state.newThread;
export const cleanNewThreadState = slice.actions.cleanState;

export default slice.reducer;
