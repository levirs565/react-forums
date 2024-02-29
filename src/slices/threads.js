import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "threads",
  initialState: {
    value: [],
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const updateFromApi = () => async (dispath) => {
  dispath(
    slice.actions.update(
      (await (await fetch("https://forum-api.dicoding.dev/v1/threads")).json())
        .data.threads
    )
  );
};

export default slice.reducer;
