import React from 'react';
import {
  describe, expect, it, vi,
} from 'vitest';
import { render, screen, userEvent } from '../test/utils';
import VoteButtons from './Vote';

describe('VoteButtons component', () => {
  it('should call right callback', async () => {
    const upVote = vi.fn();
    const downVote = vi.fn();
    const neutralizeVote = vi.fn();
    render(<VoteButtons
      downVoteCount={1}
      upVoteCount={2}
      isUpVoted={false}
      isDownVoted={false}
      onUpVote={upVote}
      onDownVote={downVote}
      onNeutralizeVote={neutralizeVote}
    />);
    await userEvent.click(screen.getByText('1'));

    expect(upVote).toBeCalledTimes(0);
    expect(downVote).toBeCalledTimes(1);
    expect(neutralizeVote).toBeCalledTimes(0);

    await userEvent.click(screen.getByText('2'));

    expect(upVote).toBeCalledTimes(1);
    expect(downVote).toBeCalledTimes(1);
    expect(neutralizeVote).toBeCalledTimes(0);
  });

  it('should call neutralize when upvoting upvoted vote', async () => {
    const upVote = vi.fn();
    const downVote = vi.fn();
    const neutralizeVote = vi.fn();
    render(<VoteButtons
      downVoteCount={1}
      upVoteCount={2}
      isUpVoted
      isDownVoted={false}
      onUpVote={upVote}
      onDownVote={downVote}
      onNeutralizeVote={neutralizeVote}
    />);
    await userEvent.click(screen.getByText('2'));

    expect(upVote).toBeCalledTimes(0);
    expect(downVote).toBeCalledTimes(0);
    expect(neutralizeVote).toBeCalledTimes(1);
  });

  it('should call neutralize when downvoting downvoted vote', async () => {
    const upVote = vi.fn();
    const downVote = vi.fn();
    const neutralizeVote = vi.fn();
    render(<VoteButtons
      downVoteCount={1}
      upVoteCount={2}
      isUpVoted={false}
      isDownVoted
      onUpVote={upVote}
      onDownVote={downVote}
      onNeutralizeVote={neutralizeVote}
    />);
    await userEvent.click(screen.getByText('1'));

    expect(upVote).toBeCalledTimes(0);
    expect(downVote).toBeCalledTimes(0);
    expect(neutralizeVote).toBeCalledTimes(1);
  });
});
