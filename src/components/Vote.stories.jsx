import React from 'react';
import { AppButtonGroup } from './AppButton';
import VoteButtons from './Vote';

export default {
  title: 'VoteButtons',
  component: VoteButtons,
  decorators: [
    (Story) => (
      <AppButtonGroup>
        <Story />
      </AppButtonGroup>
    ),
  ],
};

export const Idle = {
  args: {
    upVoteCount: 10,
    downVoteCount: 20,
    isUpVoted: false,
    isDownVoted: false,
  },
};

export const UpVoted = {
  args: {
    upVoteCount: 10,
    downVoteCount: 20,
    isUpVoted: true,
    isDownVoted: false,
  },
};

export const DownVoted = {
  args: {
    upVoteCount: 10,
    downVoteCount: 20,
    isUpVoted: false,
    isDownVoted: true,
  },
};
