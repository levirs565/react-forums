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

  it('render correct icon when user is not voting', async () => {
    render(<VoteButtons
      downVoteCount={1}
      upVoteCount={2}
      isUpVoted={false}
      isDownVoted={false}
    />);

    expect(screen.getByText('1').parentElement.firstChild).toMatchInlineSnapshot(`<svg
  fill="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM13 12H16L12 16L8 12H11V8H13V12Z"
  />
</svg>`);

    expect(screen.getByText('2').parentElement.firstChild).toMatchInlineSnapshot(
      `<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20ZM13 12H16L12 16L8 12H11V8H13V12Z" />
</svg>`,
    );
  });
});
