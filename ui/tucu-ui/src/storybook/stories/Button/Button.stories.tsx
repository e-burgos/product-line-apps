import type { Meta, StoryFn } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Button from '../../../components/buttons';
import { StoryContainer } from '../../components/StoryContainer';

const meta: Meta<typeof Button> = {
  title: 'UI COMPONENTS/Buttons/Button',
  tags: ['autodocs'],
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The Button component is a basic button component that can be used to trigger actions in your application.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
      description: 'The variant of the button',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'white',
        'gray',
        'success',
        'danger',
        'warning',
        'info',
      ],
      description: 'The color of the button',
    },
    shape: {
      control: 'select',
      options: ['square', 'rounded', 'pill'],
      description: 'The shape of the button',
    },
  },
  args: {
    children: 'Button',
    color: 'primary',
    variant: 'solid',
    shape: 'rounded',
    size: 'large',
    fullWidth: false,
    disabled: false,
    onClick: fn(),
  },
};

export default meta;

const Template: StoryFn<typeof Button> = (args) => (
  <StoryContainer className="justify-center items-center">
    <Button {...args} />
  </StoryContainer>
);

export const ButtonStory = Template.bind({});
ButtonStory.args = {};
