import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './ChainMap';

export default {
  title: 'Example/中国地图',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: '测试按钮'
};
