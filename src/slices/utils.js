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

export function findThread(list, id) {
  return list?.find((value) => value.id === id);
}

export function saveOldVote(entity) {
  entity.oldUpVotesBy = [...entity.upVotesBy];
  entity.oldDownVotesBy = [...entity.downVotesBy];
}

export function resetOldVote(entity) {
  entity.oldUpVotesBy = undefined;
  entity.oldDownVotesBy = undefined;
}

export function undoOldVote(entity) {
  entity.upVotesBy = entity.oldUpVotesBy;
  entity.downVotesBy = entity.oldDownVotesBy;
}

export function upVoteEntity(entity, userId) {
  if (!entity.upVotesBy.includes(userId)) entity.upVotesBy.push(userId);
  const index = entity.downVotesBy.indexOf(userId);
  if (index >= 0) {
    entity.downVotesBy.splice(index, 1);
  }
}

export function downVoteEntity(entity, userId) {
  if (!entity.downVotesBy.includes(userId)) entity.downVotesBy.push(userId);
  const index = entity.upVotesBy.indexOf(userId);
  if (index >= 0) entity.upVotesBy.splice(index, 1);
}

export function neutralizeVoteEntity(entity, userId) {
  const downIndex = entity.downVotesBy.indexOf(userId);
  if (downIndex >= 0) {
    entity.downVotesBy.splice(downIndex, 1);
  }
  const upIndex = entity.upVotesBy.indexOf(userId);
  if (upIndex >= 0) entity.upVotesBy.splice(upIndex, 1);
}
