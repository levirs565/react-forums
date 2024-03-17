import {
  createAsyncThunk,
  createListenerMiddleware,
  createSlice,
  isFulfilled,
} from "@reduxjs/toolkit";
import { getData, postData, setToken } from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const result = await postData("login", {
      email,
      password,
    });
    setToken(result.token);
    return result.token;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, name, password }) =>
    await postData("register", {
      email,
      name,
      password,
    })
);

export const updateCurrentUser = createAsyncThunk(
  "auth/updateCurrentUser",
  async () => (await getData("users/me")).user
);

function createProcessState() {
  return {
    loading: false,
    error: null,
  };
}

function syncStateWithAsyncThunk(
  builder,
  asyncThunk,
  stateKey,
  onFullfiled = () => {}
) {
  builder.addCase(asyncThunk.pending, (state) => {
    state[stateKey].loading = true;
    state[stateKey].error = null;
  });
  builder.addCase(asyncThunk.rejected, (state, action) => {
    state[stateKey].loading = false;
    state[stateKey].error = action.error.message;
  });
  builder.addCase(asyncThunk.fulfilled, (state, action) => {
    state[stateKey].loading = false;
    state[stateKey].error = null;
    onFullfiled(state, action);
  });
}

const slice = createSlice({
  name: "auth",
  initialState: {
    userState: createProcessState(),
    loginState: createProcessState(),
    registerState: createProcessState(),
  },
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(
      builder,
      updateCurrentUser,
      "userState",
      (state, action) => {
        state.userState.user = action.payload;
      }
    );
    syncStateWithAsyncThunk(builder, login, "loginState");
    syncStateWithAsyncThunk(builder, register, "registerState");
  },
});

export const selectUserState = (state) => state.auth.userState;
export const selectLoginState = (state) => state.auth.loginState;
export const selectRegisterState = (state) => state.auth.registerState;

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isFulfilled(login),
  effect: async (action, listenerApi) => {
    console.log("Login success");
    listenerApi.dispatch(updateCurrentUser());
  },
});

export default slice.reducer;
