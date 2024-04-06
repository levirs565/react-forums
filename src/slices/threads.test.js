import { describe, expect, it } from 'vitest';
import { createProcessState } from './utils';
import threadsReducer, { updateThreads } from './threads';

const blankState = {
  threads: {
    ...createProcessState(),
    list: null,
  },
};

describe('update threads test', () => {
  it('loading state', () => {
    const state = threadsReducer(
      blankState,
      updateThreads.pending('', {}),
    );
    expect(state.threads.loading).toBe(true);
    expect(state.threads.error).toBeNull();
  });

  it('failed state', () => {
    const error = new Error('this is error');
    const state = threadsReducer(
      blankState,
      updateThreads.rejected(error, '', {}),
    );
    expect(state.threads.loading).toBe(false);
    expect(state.threads.error).toBe(error.message);
  });

  it('success state', () => {
    const list = [
      { id: '1' },
      { id: '2' },
    ];
    const state = threadsReducer(
      blankState,
      updateThreads.fulfilled(list, '', {}),
    );
    expect(state.threads.loading).toBe(false);
    expect(state.threads.error).toBeNull();
    expect(state.threads.list).toBe(list);
  });
});
