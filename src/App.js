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
import NiceContainer from "./components/NiceContainer";

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
          <Box bgcolor="#dce6fd" mb={{ xs: 0, sm: 4 }}>
            <Container
              maxWidth="md"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                py: { xs: 1, sm: 2 }
              }}
            >
              <Box display="flex" alignItems="center">
                <Typography variant="h1" letterSpacing="1px">
                  Nice Days Counter
                </Typography>
              </Box>
            </Container>
          </Box>
          <Container sx={{ p: 0 }} maxWidth="md">
            <NiceContainer>
              <NiceDayForm
                handleSubmit={handleSubmitQuery}
                isLoading={loading}
              />
            </NiceContainer>

            <Box sx={{ padding: "1.5em 0em" }}>
              {results && <Results data={results} loading={loading} />}
            </Box>
            {reqErr && (
              <Typography>
                Unable to retrieve data. Please try again later.
                {reqErr.message}
              </Typography>
            )}
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
