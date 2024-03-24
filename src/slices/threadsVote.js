import { createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../api";

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
