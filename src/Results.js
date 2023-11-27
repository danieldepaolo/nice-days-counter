import { useMemo } from 'react';
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
import {
  Paper,
  Typography,
  Box
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Puff } from 'react-loader-spinner';

import { maxNiceDaysInMonth, wikiUrl } from './constants';
import { getMonthLabelWithChartWidth, getCityNameFromRecord } from './helpers';

const XTick = ({ payload: { value }, width, ...rest }) => 
  <text {...rest} dy={12}>
    {getMonthLabelWithChartWidth(value, width)}
  </text>

const Results = ({ data, error, loading }) => {
  const { firstCity, compareCity } = data;

  const chartData = useMemo(() =>
    map(firstCity.monthNiceDays, (days, month) => ({
      month,
      niceDays: days.length,
      niceDaysCompare: compareCity.monthNiceDays[month].length
    })), [firstCity, compareCity])

  const getWikiUrl = label => label ? `${wikiUrl}${label.replace(' ', '_')}` : null

  const firstCityLabel = getCityNameFromRecord(firstCity.city)
  const compareCityLabel = getCityNameFromRecord(compareCity.city)

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
      {firstCity && !loading &&
        <Paper elevation={1} className="bar-chart-wrapper">
          <Box display="flex" gap={4} mb={3} ml={2}>
            <div>
              <Typography variant="h6">
                {firstCityLabel}{' '}
                <a
                  href={getWikiUrl(firstCityLabel)}
                  className="better-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InfoOutlinedIcon fontSize='small' />
                </a>
              </Typography>
              <Typography
                color="textSecondary"
                variant="subtitle2"
              >
                {`Population ${
                  Number(firstCity.city.fields.population).toLocaleString()}`}
              </Typography>
            </div>
            <Box mt={2}>
              <Typography variant="body1">
                {firstCity.niceDayCount} nice days in {firstCity.year}
              </Typography>
            </Box>
          </Box>
          <ResponsiveContainer minHeight={280} maxHeight={360}>
            <BarChart data={chartData} margin={{ left: 20, right: 15, top: 10, bottom: 10 }}>
              <CartesianGrid />
              <XAxis
                dataKey="month"
                tick={<XTick />}
                minTickGap={-50}
              />
              <YAxis domain={[0, maxNiceDaysInMonth]} width={30} label={{ value: 'Nice Days', angle: -90, position: 'left', offset: 10 }} />
              <Tooltip formatter={(value, name) => [value, startCase(name === "niceDays" ? firstCityLabel : compareCityLabel)]} />
              <Legend formatter={(value => value === "niceDays" ? firstCityLabel : compareCityLabel)} height={24} />
              <Bar dataKey="niceDays" fill="#334bc4" />
              <Bar dataKey="niceDaysCompare" fill="#129614" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      }
    </div>
  );
}

export default Results;
