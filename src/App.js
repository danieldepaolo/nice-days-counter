import React, { useState } from "react";
import { DateTime } from "luxon";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Button,
  Container,
  ThemeProvider,
  StyledEngineProvider,
  Typography,
} from "@mui/material";

import NiceDayForm from "./components/NiceDayForm";
import QueryForm from "./components/QueryForm";
import Results from "./components/Results";

import {
  defaultNiceDayForm,
  defaultQueryForm,
  defaultMonthNiceDays,
} from "./util/constants";
import { isNiceDay } from "./util/helpers";
import appLogo from "./assets/aerial-photo-of-mountain-surrounded-by-fog-733174.jpg";
import { fetchDailyWeatherDataForYear } from "./service";
import appTheme from "./Theme";
import "./styles/App.css";

const App = () => {
  const [niceDayFormValues, setNiceDayFormValues] =
    useState(defaultNiceDayForm);
  const [queryFormValues, setQueryFormValues] = useState(defaultQueryForm);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reqErr, setReqErr] = useState(false);

  const compileResultsForCity = (city, dayArray) => {
    const monthNiceDays = cloneDeep(defaultMonthNiceDays);
    let niceDayCount = 0;
    dayArray.forEach((day) => {
      if (isNiceDay(day, niceDayFormValues)) {
        niceDayCount++;
        const month = DateTime.fromISO(day.day).toFormat("MMMM");
        monthNiceDays[month].push(day);
      }
    });

    return {
      city,
      year: queryFormValues.year,
      monthNiceDays,
      niceDayCount,
    };
  };

  const updateFormState = (setFunc) => (field, value) =>
    setFunc((prev) => ({
      ...prev,
      [field]: value,
    }));

  const getNiceDaysDataForCity = async (city) => {
    if (!city) {
      return {};
    }

    const { year } = queryFormValues;
    const { data, error } = await fetchDailyWeatherDataForYear({ city, year });
    return { data: compileResultsForCity(city, data.daily), error };
  };

  const handleSubmitQuery = async () => {
    if (!queryFormValues.city) return;

    try {
      const {
        city: { value: firstCity },
        compareCity: { value: compareCity } = {},
      } = queryFormValues;

      setLoading(true);
      const firstCityResult = await getNiceDaysDataForCity(firstCity);
      const compareCityResult = await getNiceDaysDataForCity(compareCity);
      const error = firstCityResult.error || compareCityResult?.error;

      if (isEmpty(error)) {
        setResults({
          firstCity: firstCityResult.data,
          compareCity: compareCityResult.data,
        });
      } else {
        setReqErr(error);
      }
    } catch (err) {
      setReqErr(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <div className="app-header-bar">
            <Container className="header-content" maxWidth="md">
              <div className="header-left">
                <img
                  src={appLogo}
                  className="app-logo"
                  alt="Nice Days Counter"
                />
                <Typography variant="h4" className="app-title">
                  Nice Days Counter
                </Typography>
              </div>
            </Container>
          </div>
          <Container maxWidth="md">
            <Box mb={3}>
              <NiceDayForm
                fieldState={niceDayFormValues}
                handleChange={updateFormState(setNiceDayFormValues)}
              />
            </Box>
            <QueryForm
              fieldState={queryFormValues}
              handleChange={updateFormState(setQueryFormValues)}
            />
            <div className="submit-line">
              <Button
                variant="contained"
                color="primary"
                className="submit-btn"
                disabled={!queryFormValues.city || loading}
                onClick={handleSubmitQuery}
              >
                See Results
              </Button>
            </div>
            <div className="results-area">
              {results && <Results data={results} loading={loading} />}
            </div>
            {reqErr && (
              <div className="error-text">
                Unable to retrieve data. Please try again later.
                {reqErr.message}
              </div>
            )}
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
