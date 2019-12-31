import React from 'react';
import './App.css';
import moment from 'moment';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import { Button, Container } from '@material-ui/core';

import { isNiceDay } from './helpers';
import NiceDayForm from './NiceDayForm';
import QueryForm from './QueryForm';
import {
  defaultNiceDayForm,
  defaultQueryForm,
  defaultMonthNiceDays
} from './constants';
import Results from './Results';

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

  handleSubmitQuery = async () => {
    this.setState({ loading: true, reqErr: false, results: {}});

    const apiUrl = process.env.BACKEND_URL || "http://localhost:9000";
    const { city: { value }, year } = this.state.queryFormValues;

    const { data: { data, error } } = await axios(`${apiUrl}/nicedays?
lat=${value.geometry.coordinates[1]}&
lon=${value.geometry.coordinates[0]}&
startdate=${year}-01-01&
enddate=${year}-12-31`);
    
    if (isEmpty(error)) {
      this.compileResults(data);
    } else {
      this.setState({ reqErr: error, loading: false })
    }
  }

  render() {
    return (
      <Container maxWidth="md">
        <h2 className="app-heading">Nice Days Counter</h2>
        <div className="form-area">
          <NiceDayForm
            fieldState={this.state.niceDayFormValues}
            onChange={state => this.setState({ niceDayFormValues: state })}
          />
          <QueryForm
            fieldState={this.state.queryFormValues}
            onChange={state => this.setState({ queryFormValues: state })}
          />
          <Button
            variant="contained"
            color="primary"
            className="submit-btn"
            disabled={!this.state.queryFormValues.city || this.state.loading}
            onClick={this.handleSubmitQuery}
          >
            See Results
          </Button>
        </div>
        <Results
          data={this.state.results}
          loading={this.state.loading}
          error={this.state.reqErr}
        />
      </Container>
    );
  }
}

export default App;
