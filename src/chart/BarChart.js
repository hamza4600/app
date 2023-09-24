import React, { useMemo } from 'react';

import isNumber from 'lodash/isNumber';
import max from 'lodash/max';
import startCase from 'lodash/startCase';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import TooltipContent from './tools/Tooltip';

export default function BarChartComponent({
  bars,
  data = [],
  height = 350,
  stacked
}) {
  const maxValue = useMemo(() => {
    return data.reduce((acc, datum) => {
      const numeric = Object.values(datum).filter(isNumber);
      acc = max([acc, ...numeric]);
      return acc;
    }, []) || '';
  }, [data]);

  const yAxisWidth = useMemo(() => {
    return 15 + maxValue.toString().length * 5;
  }, [maxValue]);
  
  return (
    <ResponsiveContainer width="100%" height={height} debounce={100}>
      <BarChart
        margin={{ top: 2, right: 5, left: 0, bottom: 0 }}
        data={data}
      >
        <CartesianGrid vertical={false} strokeDasharray="6 6" />
        <XAxis dataKey="name" tickLine={false} />
        <YAxis
          width={yAxisWidth}
          tickFormatter={n => n.toLocaleString()}
          axisLine={false}
          tickLine={false}
          domain={[0, dataMax => dataMax === 0 ? 1 : dataMax]}
          allowDecimals={false}
        />
        <Tooltip content={<TooltipContent data={data} />} />
        {Object.entries(bars).map(([key, value]) => (
          <Bar
            key={key}
            name={startCase(key)}
            dataKey={key}
            fill={value.color}
            stackId={stacked ? 'a' : undefined}
            radius={[15, 15, 0, 0]}
            maxBarSize={30}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
