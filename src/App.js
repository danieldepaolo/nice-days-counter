import React from 'react';
import './App.css';
import moment from 'moment';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { Button } from '@material-ui/core';

import { isNiceDay } from './helpers';
import NiceDayForm from './NiceDayForm';
import QueryForm from './QueryForm';
import {
  numQueryDays,
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
      if (isNiceDay(day.data.daily.data[0], this.state.niceDayFormValues)) {
        niceDayCount++;
        const time = moment.unix(day.data.daily.data[0].time);
        monthNiceDays[time.format("MMMM")].push(day.data);
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

  handleSubmitQuery = () => {
    this.setState({ loading: true, reqErr: false, results: {}});
  
    const { city: { value }, year } = this.state.queryFormValues;
    const day = moment(`${year}-01-01`);
    let promises = []
    for (let i = 0; i < numQueryDays; ++i) {
      const url = `https://api.darksky.net/forecast/068b0b5412063369e7fb834c6a8eb58d/${
        value.geometry.coordinates[1]
      },${value.geometry.coordinates[0]
      },${`${day.format("YYYY-MM-DD")}T00:00:00`}?exclude=currently,hourly`;

      promises.push(axios(url));
      day.add(1, 'days');
    }

    Promise.all(promises)
      .then(this.compileResults)
      .catch(err => {
        this.setState({ reqErr: true, loading: false })
      });
  }

  render() {
    return (
      <div className="App">
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
        <Results
          data={this.state.results}
          loading={this.state.loading}
          error={this.state.reqErr}
        />
      </div>
    );
  }
}

export default App;
