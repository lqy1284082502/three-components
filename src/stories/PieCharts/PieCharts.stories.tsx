import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PieChart } from './PieCharts';

export default {
  title: 'Example/进度图',
  component: PieChart
} as ComponentMeta<typeof PieChart>;

const Template: ComponentStory<typeof PieChart> = (args) => <PieChart {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: 25
};
