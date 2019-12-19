import React from 'react';
import './App.css';
import moment from 'moment';
import axios from 'axios';
import { Button } from '@material-ui/core';

import { isNiceDay } from './helpers';
import { cityDataMap } from './cities';
import NiceDayForm from './NiceDayForm';
import QueryForm from './QueryForm';

const defaultNiceDayForm = {
  tempRange: [52, 88],
  maxPrecipIntensity: 0.005,
  maxCloudCover: 6
};

const defaultQueryForm = {
  city: Object.keys(cityDataMap)[0],
  year: '2018'
};

const numQueryDays = 365;

class App extends React.Component {
  state = {
    niceDayFormValues: defaultNiceDayForm,
    queryFormValues: defaultQueryForm,
    results: {}
  };

  compileResults = dayArray => {
    const numNiceDays = dayArray.reduce( (niceDays, day) => {
      return isNiceDay(day.data.daily.data[0], this.state.niceDayFormValues)
        ? niceDays + 1
        : niceDays;
    }, 0);

    const { city, year } = this.state.queryFormValues;
    this.setState(state => ({
      ...state,
      results: {
        city,
        date: moment(`${year}-01-01`),
        niceDayCount: numNiceDays
      }
    }));
  }

  handleSubmitQuery = () => {
    const { city, year } = this.state.queryFormValues;
    const cityData = cityDataMap[city];

    const day = moment(`${year}-01-01`);
    let promises = []
    for (let i = 0; i < numQueryDays; ++i) {
      const url = `https://api.darksky.net/forecast/068b0b5412063369e7fb834c6a8eb58d/${
        cityData.location[0]
      },${cityData.location[1]},${`${day.format("YYYY-MM-DD")}T00:00:00`}?exclude=currently,hourly`;

      promises.push(axios(url));
      day.add(1, 'days');
    }

    Promise.all(promises).then(response => this.compileResults(response));
  }

  render() {
    const { city, niceDayCount } = this.state.results;
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
          onClick={this.handleSubmitQuery}
        >
          Submit
        </Button>
        {city &&
          <div className="results-area">
            <label>{cityDataMap[city].title}</label>
            {niceDayCount} Nice Days ({(niceDayCount / numQueryDays * 100).toFixed(1)}%)
          </div>
        }
      </div>
    );
  }
}

export default App;
