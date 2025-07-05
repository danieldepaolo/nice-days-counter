import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import {
  Box,
  Container,
  ThemeProvider,
  StyledEngineProvider,
  Typography,
} from "@mui/material";

import NiceDayForm from "./components/NiceDayForm";
import Results from "./components/Results";

import appLogo from "./assets/aerial-photo-of-mountain-surrounded-by-fog-733174.jpg";
import WeatherDataService from "./service";
import { theme } from "./Theme";
import "./styles/App.css";

const App = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reqErr, setReqErr] = useState(false);

  const handleSubmitQuery = async (formValues) => {
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
        <ThemeProvider theme={theme}>
          <Box bgcolor="#dce6fd" padding=".8em 0" mb={4}>
            <Container
              maxWidth="md"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center">
                <img
                  src={appLogo}
                  className="app-logo"
                  alt="Nice Days Counter"
                />
                <Typography variant="h2" letterSpacing="1px">
                  Nice Days Counter
                </Typography>
              </Box>
            </Container>
          </Box>
          <Container maxWidth="md">
            <NiceDayForm handleSubmit={handleSubmitQuery} isLoading={loading} />
            <Box sx={{ padding: "1.5em 0em", minWidth: "300px" }}>
              {results && <Results data={results} loading={loading} />}
            </Box>
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
