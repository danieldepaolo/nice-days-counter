import React from 'react';
import map from 'lodash/map';
import {
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Loader from 'react-loader-spinner';
import { SizeMe } from 'react-sizeme';

import { numQueryDays, maxNiceDaysInMonth } from './constants';
import { getMonthLabelWithChartWidth } from './helpers';

const XTick = ({
  payload: { value },
  verticalAnchor,
  visibleTicksCount,
  viewBox,
  ...rest
}) => {
  return (
  <text {...rest} dy={12}>
    {getMonthLabelWithChartWidth(value, viewBox.width)}
  </text>)
};

class Results extends React.Component {
  collectChartData = () =>
    map(this.props.data.monthNiceDays, (days, month) => ({
      month,
      niceDays: days.length
    }));
    

  render = () => {
    const { city, niceDayCount } = this.props.data;
    return (
      <div className="results-area">
        {this.props.loading &&
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
        />} 
        {this.props.error &&
          <div className="error-text">
            Unable to retrieve data. Please try again later.
          </div>}
        {city &&
          <div className="centered-block">
            <label>{city.label}</label>
            {niceDayCount} Nice Days ({(niceDayCount / numQueryDays * 100).toFixed(1)}%)
            <SizeMe>
              {({ size }) =>
                <ResponsiveContainer
                  width="70%"
                  height={250}
                  minWidth={320}
                >
                  <BarChart data={this.collectChartData()}>
                    <XAxis
                      dataKey="month"
                      tick={<XTick />}
                      minTickGap={-50}
                    />
                    <YAxis domain={[0, maxNiceDaysInMonth]} width={30} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="niceDays" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>}
            </SizeMe>
          </div>}
      </div>
    );
  }
}

export default Results;
