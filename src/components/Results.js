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
import { Box, Typography, useMediaQuery } from "@mui/material";

import CityResult from "./CityResult";
import NiceContainer from "./NiceContainer";

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

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  return (
    <div>
      {firstCity && !loading && (
        <NiceContainer>
          <Typography variant="h4" mb={2}>
            Results
          </Typography>
          <Box display="flex" justifyContent="space-around" flexWrap="wrap" gap={3} mb={3}>
            <CityResult city={firstCity} color={firstCityColor} />
            <Box display="flex" flexDirection="column" gap={2} justifyContent="center">
              <div>{`Temperature between ${data.formValues.tempRange[0]}\u00B0 F and ${data.formValues.tempRange[1]}\u00B0 F`}</div>
              <div>{`At most ${data.formValues.maxPrecip} inches of rain`}</div>
              <div>{`At least ${data.formValues.minSunshineDuration} hours of sun`}</div>
            </Box>
            <CityResult city={compareCity} color={compareCityColor} />
          </Box>
          <ResponsiveContainer height={isSmallScreen ? 280 : 360}>
            <BarChart
              data={chartData}
              margin={{ left: 20, right: 15, top: 10, bottom: 10 }}
            >
              <CartesianGrid />
              <XAxis dataKey="month" tick={<XTick />} minTickGap={-50} />
              <YAxis domain={[0, maxNiceDaysInMonth]} width={10} />
              <Tooltip
                formatter={(value, name) => [
                  `${value} days`,
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
        </NiceContainer>
      )}
    </div>
  );
};

export default Results;
