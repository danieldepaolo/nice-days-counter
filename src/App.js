import React from 'react';
import './App.css';
import moment from 'moment';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { Button, Container } from '@material-ui/core';

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

class App extends React.Component {
  state = {
    niceDayFormValues: defaultNiceDayForm,
    queryFormValues: defaultQueryForm,
    results: {},
    loading: false,
    reqErr: false
  };

  compileResults = dayArray => {
    const monthNiceDays = cloneDeep(defaultMonthNiceDays);
    let niceDayCount = 0;
    dayArray.forEach(day => {
      if (isNiceDay(day.daily.data[0], this.state.niceDayFormValues)) {
        niceDayCount++;
        const time = moment.unix(day.daily.data[0].time);
        monthNiceDays[time.format("MMMM")].push(day);
      }
    });

    const { city, year } = this.state.queryFormValues;
    this.setState({
      results: {
        city,
        year,
        monthNiceDays,
        niceDayCount
      },
      loading: false,
      reqErr: false
    });
  }

  getData = async () => {
    const { city: { value }, year } = this.state.queryFormValues;
    const localData = getCachedData(value, year);
    if (!localData) {
      const apiUrl = process.env.REACT_APP_BACKEND_URL || "https://nice-days-app-backend.herokuapp.com";
      this.setState({ loading: true, reqErr: false, results: {}});

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

  handleSubmitQuery = async () => {
    try {
      const { data, error, cacheHit } = await this.getData();
      if (isEmpty(error)) {
        const { city: { value }, year } = this.state.queryFormValues;
        this.compileResults(data);
        if (!cacheHit) {
          storeDataInCache(value, year, data);
        }
      } else {
        this.setState({ reqErr: error, loading: false })
      }
    } catch (err) {
      this.setState({ reqErr: err, loading: false })
    }
  }

  render() {
    return (
      <div>
        <div className="app-header-bar">
          <Container className="header-content" maxWidth="md">
            <div className="header-left">
              <img src={appLogo} className="app-logo" />
              <div className="app-title">Nice Days Counter</div>
            </div>
          </Container>
        </div>
        <Container maxWidth="md">
          <div className="form-area">
            <NiceDayForm
              fieldState={this.state.niceDayFormValues}
              onChange={state => this.setState({ niceDayFormValues: state })}
            />
            <QueryForm
              fieldState={this.state.queryFormValues}
              onChange={state => this.setState({ queryFormValues: state })}
            />
            <div className="submit-line">
              <Button
                variant="contained"
                color="primary"
                className="submit-btn"
                disabled={!this.state.queryFormValues.city || this.state.loading}
                onClick={this.handleSubmitQuery}
              >
                See Results
              </Button>
              <a href="https://darksky.net/poweredby/">
                <img
                  className="dark-sky-img"
                  src="https://darksky.net/dev/img/attribution/poweredby-oneline.png"
                />
              </a>
            </div>
          </div>
          <Results
            data={this.state.results}
            loading={this.state.loading}
            error={this.state.reqErr}
          />
        </Container>
      </div>
    );
  }
}

export default App;
