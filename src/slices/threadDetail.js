import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "threadDetail",
  initialState: {
    value: {},
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const updateFromApi = (id) => async (dispath) => {
  dispath(
    slice.actions.update(
      (
        await (
          await fetch("https://forum-api.dicoding.dev/v1/threads/" + id)
        ).json()
      ).data.detailThread
    )
  );
};

export default slice.reducer;
