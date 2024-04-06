import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import threadDetailReducer, { upVoteComment } from './threadDetail';
import { postData } from '../api';

const initialState = {
  detail: {
    detail: {
      id: '12',
      comments: [
        {
          id: '34',
          upVotesBy: ['caa'],
          downVotesBy: ['lat'],
        },
      ],
    },
  },
};

vi.mock('../api', async (importOriginal) => ({
  ...await importOriginal(),
  postData: vi.fn(),
}));

describe('upvote reducer', () => {
  it('pending state', () => {
    const state = threadDetailReducer(
      initialState,
      upVoteComment.pending(
        '',
        { threadId: '12', commentId: '34' },
        { userId: 'kaka' },
      ),
    );
    expect(state.detail.detail.comments[0].upVotesBy).toEqual(['caa', 'kaka']);
    expect(state.detail.detail.comments[0].oldUpVotesBy).toEqual(['caa']);
    expect(state.detail.detail.comments[0].oldDownVotesBy).toEqual(['lat']);
  });

  it('pending state by user that have upvoted', () => {
    const state = threadDetailReducer(
      initialState,
      upVoteComment.pending(
        '',
        { threadId: '12', commentId: '34' },
        { userId: 'caa' },
      ),
    );
    expect(state.detail.detail.comments[0].upVotesBy).toEqual(['caa']);
  });

  it('pending state by user that have downvoted', () => {
    const state = threadDetailReducer(
      initialState,
      upVoteComment.pending(
        '',
        { threadId: '12', commentId: '34' },
        { userId: 'lat' },
      ),
    );
    expect(state.detail.detail.comments[0].upVotesBy).toEqual(['caa', 'lat']);
    expect(state.detail.detail.comments[0].downVotesBy).toEqual([]);
  });

  it('restore when fail', () => {
    let state = threadDetailReducer(
      initialState,
      upVoteComment.pending(
        '',
        { threadId: '12', commentId: '34' },
        { userId: 'kaka' },
      ),
    );
    state = threadDetailReducer(
      state,
      upVoteComment.rejected(
        new Error(),
        '',
        { threadId: '12', commentId: '34' },
        null,
        { userId: 'kaka' },
      ),
    );

    expect(state.detail.detail.comments[0].upVotesBy).toEqual(['caa']);
    expect(state.detail.detail.comments[0].oldUpVotesBy).toBeUndefined();
    expect(state.detail.detail.comments[0].oldDownVotesBy).toBeUndefined();
  });

  it('commit and clean when success', () => {
    let state = threadDetailReducer(
      initialState,
      upVoteComment.pending(
        '',
        { threadId: '12', commentId: '34' },
        { userId: 'kaka' },
      ),
    );
    state = threadDetailReducer(
      state,
      upVoteComment.fulfilled(
        {},
        '',
        { threadId: '12', commentId: '34' },
        { userId: 'kaka' },
      ),
    );
    expect(state.detail.detail.comments[0].upVotesBy).toEqual(['caa', 'kaka']);
    expect(state.detail.detail.comments[0].oldUpVotesBy).toBeUndefined();
    expect(state.detail.detail.comments[0].oldDownVotesBy).toBeUndefined();
  });

  it('upvote different comment\'s vote', () => {
    const state = threadDetailReducer(
      initialState,
      upVoteComment.pending(
        '',
        { threadId: '15', commentId: '79' },
        { userId: 'kaka' },
      ),
    );
    expect(state.detail.detail.comments[0].upVotesBy).toEqual(['caa']);
    expect(state.detail.detail.comments[0].oldUpVotesBy).toBeUndefined();
    expect(state.detail.detail.comments[0].oldDownVotesBy).toBeUndefined();
  });

  it('when have multiple commment', () => {
    let state = {
      detail: {
        detail: {
          id: '12',
          comments: [
            {
              id: '89',
              upVotesBy: ['caa'],
              downVotesBy: ['lat'],
            },
            {
              id: '34',
              upVotesBy: ['caa'],
              downVotesBy: ['lat'],
            },
          ],
        },
      },
    };

    state = threadDetailReducer(
      state,
      upVoteComment.pending(
        '',
        { threadId: '12', commentId: '34' },
        { userId: 'kaka' },
      ),
    );

    expect(state.detail.detail.comments[1].upVotesBy).toEqual(['caa', 'kaka']);
  });
});

beforeEach(() => {
  vi.resetAllMocks();
});

const globalState = {
  auth: {
    userState: {
      user: {
        id: 'aca',
      },
    },
  },
};
const getGlobalState = () => globalState;

describe('upvote thunk', () => {
  it('must pending and fullfiled with right data', async () => {
    const arg = { threadId: '12', commendId: '34' };
    let requestId;
    const dispatch = vi.fn().mockImplementation(({ meta }) => {
      requestId = meta.requestId;
    });
    postData.mockResolvedValueOnce({ vote: arg });

    await (upVoteComment(arg))(dispatch, getGlobalState);

    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      upVoteComment.pending(requestId, arg, { userId: 'aca' }),
    );
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      upVoteComment.fulfilled(arg, requestId, arg),
    );
  });

  it('must rejected with right data', async () => {
    const error = new Error('this is error');
    let requestId;
    const dispatch = vi.fn().mockImplementation(({ meta }) => {
      requestId = meta.requestId;
    });
    postData.mockRejectedValueOnce(error);

    const arg = { threadId: '12', commendId: '34' };

    await (upVoteComment(arg))(dispatch, getGlobalState);

    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      upVoteComment.rejected(error, requestId, arg),
    );
  });
});
