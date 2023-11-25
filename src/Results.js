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
import { Puff } from 'react-loader-spinner';

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

const XTick = ({ payload: { value }, width, ...rest }) => 
  <text {...rest} dy={12}>
    {getMonthLabelWithChartWidth(value, width)}
  </text>

const Results = ({ data, error, loading }) => {
  const collectChartData = () =>
    map(data.monthNiceDays, (days, month) => ({
      month,
      niceDays: days.length
    }));

  const { city, year, niceDayCount } = data;

  const cityUrl = city
      ? `https://en.wikipedia.org/wiki/${
            city.label.replace(' ', '_')}`
      : null;

  return (
    <div className="results-area">
      {error &&
        <div className="error-text">
          Unable to retrieve data. Please try again later.
        </div>}
      {loading &&
        <Puff
          color="#00BFFF"
          height={100}
          width={100}
      />}
      {city && !loading &&
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
                href={cityUrl}
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
              <BarChart data={collectChartData()}>
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

export default Results;
