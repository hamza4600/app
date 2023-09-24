import { compose } from 'redux';

import { ChartContainer, withNoResults, withContainer } from './helpers';

import BarChartComponent from './BarChart';

const BarChart = compose(
  withContainer,
  withNoResults
)(BarChartComponent);

export {
  ChartContainer,
  BarChart
};
