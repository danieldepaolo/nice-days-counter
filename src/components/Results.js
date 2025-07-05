import { useMemo } from "react";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Box, Paper } from "@mui/material";
import { Dna } from "react-loader-spinner";

import CityResult from "./CityResult";

import {
  compareCityColor,
  firstCityColor,
  maxNiceDaysInMonth,
} from "../util/constants";
import { getMonthLabelWithChartWidth } from "../util/helpers";
import { theme } from "../Theme";

const XTick = ({ payload: { value }, width, ...rest }) => (
  <text {...rest} dy={12}>
    {getMonthLabelWithChartWidth(value, width)}
  </text>
);

const Results = ({ data, loading }) => {
  const { firstCity, compareCity } = data;

  const chartData = useMemo(() => {
    const data = map(firstCity.monthNiceDays, (days, month) => ({
      month,
      niceDays: days.length,
    }));

    return !isEmpty(compareCity)
      ? data.map((point) => ({
          ...point,
          niceDaysCompare: compareCity.monthNiceDays?.[point.month]?.length,
        }))
      : data;
  }, [firstCity, compareCity]);

  const barChartContainerStyles = {
    width: '95%',
    minWidth: '330px',
    maxWidth: '1000px',
    marginTop: '10px',
    padding: '20px 15px 10px 15px',

    [theme.breakpoints.down('sm')]: {
      padding: '20px 5px 10px 0',
      width: '90%',
      boxShadow: 'none',
    }
  }

  return (
    <div>
      <Box textAlign="center">
        <Dna visible={loading} height={150} width={300} />
      </Box>
      {firstCity && !loading && (
        <Paper elevation={1} sx={barChartContainerStyles}>
          <Box display="flex" flexWrap="wrap" gap={3} mb={3} ml={2}>
            <CityResult city={firstCity} color={firstCityColor} />
            <CityResult city={compareCity} color={compareCityColor} />
          </Box>
          <ResponsiveContainer minHeight={280} maxHeight={360}>
            <BarChart
              data={chartData}
              margin={{ left: 20, right: 15, top: 10, bottom: 10 }}
            >
              <CartesianGrid />
              <XAxis dataKey="month" tick={<XTick />} minTickGap={-50} />
              <YAxis
                domain={[0, maxNiceDaysInMonth]}
                width={30}
                label={{
                  value: "Nice Days",
                  angle: -90,
                  position: "left",
                  offset: 10,
                }}
              />
              <Tooltip
                formatter={(value, name) => [
                  value,
                  name === "niceDays"
                    ? firstCity.city.name
                    : compareCity.city.name,
                ]}
              />
              <Bar dataKey="niceDays" fill={firstCityColor} />
              {!isEmpty(compareCity) ? (
                <Bar dataKey="niceDaysCompare" fill={compareCityColor} />
              ) : null}
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      )}
    </div>
  );
};

export default Results;
