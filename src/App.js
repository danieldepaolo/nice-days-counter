import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import {
  Container,
  ThemeProvider,
  StyledEngineProvider,
  Typography,
} from "@mui/material";

import NiceDayForm from "./components/NiceDayForm";
import Results from "./components/Results";

import appLogo from "./assets/aerial-photo-of-mountain-surrounded-by-fog-733174.jpg";
import WeatherDataService from "./service";
import appTheme from "./Theme";
import "./styles/App.css";

const App = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reqErr, setReqErr] = useState(false);

  const handleSubmitQuery = async (formValues) => {
    console.log(formValues);
    if (!formValues.city) return;

    const service = new WeatherDataService(formValues);

    try {
      setLoading(true);
      const firstCityResult = await service.getNiceDaysDataForCity(
        formValues.city
      );
      const compareCityResult = await service.getNiceDaysDataForCity(
        formValues.compareCity
      );
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
            <NiceDayForm handleSubmit={handleSubmitQuery} isLoading={loading} />
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
