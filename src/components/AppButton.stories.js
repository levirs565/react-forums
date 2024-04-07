import { AppButton } from './AppButton';

export default {
  title: 'AppButton',
  component: AppButton,
};

export const Normal = {
  args: {
    children: 'Normal',
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};
