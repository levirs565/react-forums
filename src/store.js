import { configureStore } from '@reduxjs/toolkit';
import auth, { listenerMiddleware, updateCurrentUser } from './slices/auth';
import threads from './slices/threads';
import threadDetail from './slices/threadDetail';
import leaderboard from './slices/leaderboard';
import newThread from './slices/newThread';

const store = configureStore({
  reducer: {
    auth,
    threads,
    threadDetail,
    newThread,
    leaderboard,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware),
});

store.dispatch(updateCurrentUser());

export default store;
