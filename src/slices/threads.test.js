import {
  beforeEach,
  describe, expect, it, vi,
} from 'vitest';
import { createProcessState } from './utils';
import threadsReducer, { updateThreads } from './threads';
import { getData } from '../api';

const blankState = {
  threads: {
    ...createProcessState(),
    list: null,
  },
};

vi.mock('../api', async (importOriginal) => ({
  ...await importOriginal(),
  getData: vi.fn(),
}));

/*
Skenatio update threads list reducer:
- Saat pending, loading harus bernilai true dan error bernilai null
- Saat gagal, loading harus bernilai false dan error bernilai penyebab error
- Saat berhasil, loading harus bernilai false, error bernilai null dan list berisi daftar thread
*/

describe('update threads state', () => {
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

beforeEach(() => {
  vi.resetAllMocks();
});

/*
Skenario update threads thunk:
- Saat berhasil, maka reducer pending dan fullfiled harus dipanggil dengan data yang benar
- Saat gagal, maka reducer rejected harus dipanggil dengan data yang benar
*/

describe('update threads thunk', () => {
  it('dispatch fullfiled with right data', async () => {
    const list = [
      {
        id: '1',
      },
      {
        id: '2',
      },
    ];
    let requestId;
    const dispatch = vi.fn().mockImplementation(({ meta }) => {
      requestId = meta.requestId;
    });
    getData.mockResolvedValueOnce({
      threads: list,
    });

    await (updateThreads())(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      updateThreads.pending(requestId),
    );

    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      updateThreads.fulfilled(list, requestId),
    );
  });
  it('dispatch rejected error', async () => {
    const error = new Error('this is error');
    let requestId;
    const dispatch = vi.fn().mockImplementation(({ meta }) => {
      requestId = meta.requestId;
    });
    getData.mockRejectedValueOnce(error);

    await (updateThreads())(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      updateThreads.pending(requestId),
    );
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      updateThreads.rejected(error, requestId),
    );
  });
});
