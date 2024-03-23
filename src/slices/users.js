import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProcessState, syncStateWithAsyncThunk } from "./utils";
import { getData } from "../api";

export const updateUsers = createAsyncThunk(
  "users/update",
  async () => (await getData("/users")).users
);

const slice = createSlice({
  name: "users",
  initialState: createProcessState(true),
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(builder, updateUsers, null, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const selectUsersList = (state) => state.users;

export default slice.reducer;
