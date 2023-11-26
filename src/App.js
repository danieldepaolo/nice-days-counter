import React, { useState } from 'react';
import './App.css';
import { DateTime } from "luxon"
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import appTheme from "./Theme"
import { Box, Button, Container, ThemeProvider, StyledEngineProvider, Typography } from '@mui/material';

import { isNiceDay, storeDataInCache, getCachedData } from './helpers';
import NiceDayForm from './NiceDayForm';
import QueryForm from './QueryForm';
import Results from './Results';
import {
  defaultNiceDayForm,
  defaultQueryForm,
  defaultMonthNiceDays
} from './constants';
import appLogo from './aerial-photo-of-mountain-surrounded-by-fog-733174.jpg';

const App = () => {
  const [niceDayFormValues, setNiceDayFormValues] = useState(defaultNiceDayForm)
  const [queryFormValues, setQueryFormValues] = useState(defaultQueryForm)
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)
  const [reqErr, setReqErr] = useState(false)

  const compileResults = dayArray => {
    const monthNiceDays = cloneDeep(defaultMonthNiceDays);
    let niceDayCount = 0;
    dayArray.forEach(day => {
      if (isNiceDay(day, niceDayFormValues)) {
        niceDayCount++;
        const month = DateTime.fromISO(day.day).toFormat("MMMM");
        monthNiceDays[month].push(day);
      }
    });

    setResults({
      ...queryFormValues,
      monthNiceDays,
      niceDayCount
    });
    setLoading(false);
    setReqErr(false);
  }

  const updateFormState = setFunc => (field, value) => (
    setFunc(prev => ({
      ...prev,
      [field]: value
    }))
  )

  const getData = async () => {
    const { city: { value }, year } = queryFormValues;
    const localData = getCachedData(value, year);
    if (!localData) {
      const apiUrl = process.env.REACT_APP_BACKEND_URL || "https://nice-days-app-backend.herokuapp.com";
      setLoading(true)
      setReqErr(false)

      const { data: { data, error } } = await axios(`${apiUrl}/nicedays?
lat=${value.geometry.coordinates[1]}&
lon=${value.geometry.coordinates[0]}&
startdate=${year}-01-01&
enddate=${year}-12-31`);

      return { data, error, cacheHit: false };
    } else { // cache hit
      return { data: localData, error: null, cacheHit: true };
    }
  }

  const handleSubmitQuery = async () => {
    try {
      const { data, error, cacheHit } = await getData();
      if (isEmpty(error)) {
        const { city: { value }, year } = queryFormValues;
        compileResults(data.daily);
        if (!cacheHit) {
          storeDataInCache(value, year, data);
        }
      } else {
        setReqErr(error)
      }
    } catch (err) {
      setReqErr(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={appTheme}>
          <div className="app-header-bar">
            <Container className="header-content" maxWidth="md">
              <div className="header-left">
                <img src={appLogo} className="app-logo" alt="Nice Days Counter" />
                <Typography variant="h4" className="app-title">Nice Days Counter</Typography>
              </div>
            </Container>
          </div>
          <Container maxWidth="md">
            <Box mb={2}>
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
            <Results
              data={results}
              loading={loading}
              error={reqErr}
            />
          </Container>
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
