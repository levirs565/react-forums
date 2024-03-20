export function createProcessState(isLoading = true) {
  return {
    loading: isLoading,
    error: null,
  };
}

export function syncStateWithAsyncThunk(
  builder,
  asyncThunk,
  stateKey,
  onFullfiled = () => {}
) {
  const acessor = stateKey ? (state) => state[stateKey] : (state) => state;
  builder.addCase(asyncThunk.pending, (state) => {
    acessor(state).loading = true;
    acessor(state).error = null;
  });
  builder.addCase(asyncThunk.rejected, (state, action) => {
    acessor(state).loading = false;
    acessor(state).error = action.error.message;
  });
  builder.addCase(asyncThunk.fulfilled, (state, action) => {
    acessor(state).loading = false;
    acessor(state).error = null;
    onFullfiled(state, action);
  });
}
