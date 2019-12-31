import React from 'react';
import map from 'lodash/map';
import startCase from 'lodash/startCase';
import {
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import Loader from 'react-loader-spinner';

import { maxNiceDaysInMonth } from './constants';
import { getMonthLabelWithChartWidth } from './helpers';
import {
  Button,
  Paper,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';

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

  cityUrl = () =>
    this.props.data.city
      ? `https://en.wikipedia.org/wiki/${
            this.props.data.city.label.replace(' ', '_')}`
      : null;

  render = () => {
    const { city, year, niceDayCount } = this.props.data;      
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
          <>
            <Card variant="outlined" classes={{ root: "city-results-card"}}>
              <CardContent>
                <Typography variant="h6">
                  {city.label}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  style={{ marginBottom: 15 }}
                >
                  {`Population ${
                    Number(city.value.fields.population).toLocaleString()}`}
                </Typography>
                <Typography>
                  {niceDayCount} nice days in {year}
                </Typography>
              </CardContent>
              <CardActions>
                <a
                  href={this.cityUrl()}
                  className="better-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="small">
                    Learn More
                  </Button> 
                </a>
              </CardActions>
            </Card>
            <Paper elevation={1} className="bar-chart-wrapper">
              <ResponsiveContainer>
                <BarChart data={this.collectChartData()}>
                  <CartesianGrid />
                  <XAxis
                    dataKey="month"
                    tick={<XTick />}
                    minTickGap={-50}
                  />
                  <YAxis domain={[0, maxNiceDaysInMonth]} width={30} />
                  <Tooltip formatter={(value, name) => [value, startCase(name)]} />
                  <Legend formatter={startCase} />
                  <Bar dataKey="niceDays" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </>}
      </div>
    );
  }
}

export default Results;
