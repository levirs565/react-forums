import { createAsyncThunk } from '@reduxjs/toolkit';
import { postData } from '../api';
import { getUserIdMeta } from './auth';

export const upVoteThread = createAsyncThunk(
  'threads/upVoteThread',
  async ({ id }) => (await postData(`/threads/${id}/up-vote`, {})).vote,
  {
    getPendingMeta: getUserIdMeta,
  },
);

export const downVoteThread = createAsyncThunk(
  'threads/downVoteThread',
  async ({ id }) => (await postData(`/threads/${id}/down-vote`, {})).vote,
  {
    getPendingMeta: getUserIdMeta,
  },
);

export const neutralizeVoteThread = createAsyncThunk(
  'threads/neutralizeVoteThread',
  async ({ id }) => (await postData(`/threads/${id}/neutral-vote`, {})).vote,
  {
    getPendingMeta: getUserIdMeta,
  },
);
