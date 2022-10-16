import React from 'react';
import { PieChart2 } from './components/PieChart2';
import './pieCharts.scss';

interface PieChartProps {
  value: number
}

export const PieChart = ({
  value = 25,
  ...props
}: PieChartProps) => {
  return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000', height: 500 }}>
          <PieChart2 color="#0b3265" lightColor="#67d5e2" value={value} />
        </div>
  );
};
