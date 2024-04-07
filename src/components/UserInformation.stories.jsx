import React from 'react';
import { UserInformation, UserInformationShimmer } from './UserInformation';

export default {
  title: 'UserInformation',
  component: UserInformation,
};

export const ReadyState = {
  args: {
    avatar: 'https://ui-avatars.com/api/?name=Test',
    name: 'Test',
  },
};

export const Shimmer = {
  render: () => <UserInformationShimmer />,
};
