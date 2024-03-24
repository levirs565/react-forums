import {
  createAsyncThunk,
  createListenerMiddleware,
  createSlice,
  isFulfilled,
} from '@reduxjs/toolkit';
import { getData, postData, setToken } from '../api';
import { createProcessState, syncStateWithAsyncThunk } from './utils';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const result = await postData('login', {
      email,
      password,
    });
    setToken(result.token);
    return result.token;
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, name, password }) => postData('register', {
    email,
    name,
    password,
  }),
);

export const updateCurrentUser = createAsyncThunk(
  'auth/updateCurrentUser',
  async () => (await getData('users/me')).user,
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    userState: createProcessState(),
    loginState: createProcessState(),
    registerState: createProcessState(),
  },
  reducers: {
    logout: (state) => {
      setToken(null);
      state.userState.user = null;
    },
  },
  extraReducers: (builder) => {
    syncStateWithAsyncThunk(
      builder,
      updateCurrentUser,
      'userState',
      (state, action) => {
        state.userState.user = action.payload;
      },
    );
    syncStateWithAsyncThunk(builder, login, 'loginState');
    syncStateWithAsyncThunk(builder, register, 'registerState');
  },
});

export const selectUserState = (state) => state.auth.userState;
export const selectLoginState = (state) => state.auth.loginState;
export const selectRegisterState = (state) => state.auth.registerState;

export const { logout } = slice.actions;

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isFulfilled(login),
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(updateCurrentUser());
  },
});

export const getUserIdMeta = (_, { getState }) => ({
  userId: selectUserState(getState()).user?.id,
});

export default slice.reducer;
