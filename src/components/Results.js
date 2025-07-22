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
import { WbSunny, Thermostat, WaterDrop } from "@mui/icons-material";

import CityResult from "./CityResult";
import NiceContainer from "./ui/NiceContainer";
import SectionHeading from "./ui/SectionHeading";

import {
  compareCityColor,
  firstCityColor,
  sunColor,
  thermostatRedColor,
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
          <SectionHeading mb={2}>Results</SectionHeading>
          <Box display="flex" flexDirection="column" gap={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              flexWrap="wrap"
              alignItems="center"
              sx={{ px: 1 }}
              gap={4}
            >
              <Box display="flex" gap={4}>
                <CityResult city={firstCity} color={firstCityColor} />
                <CityResult city={compareCity} color={compareCityColor} />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                justifyContent="center"
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Thermostat sx={{ color: thermostatRedColor }} />{" "}
                  {`Temperature between ${data.formValues.tempRange[0]}\u00B0 F and ${data.formValues.tempRange[1]}\u00B0 F`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <WaterDrop color="primary" />{" "}
                  {`At most ${data.formValues.maxPrecip} inches of rain`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <WbSunny sx={{ color: sunColor }} />{" "}
                  {`At least ${data.formValues.minSunshineDuration} hours of sun`}
                </Typography>
              </Box>
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
          </Box>
        </NiceContainer>
      )}
    </div>
  );
};

export default Results;
