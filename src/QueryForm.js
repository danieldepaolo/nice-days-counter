import React from 'react';
import {Form, Field} from 'simple-react-form';
import DropdownField from './formFields/DropdownField';
import Select, { createFilter } from 'react-select';
import orderBy from 'lodash/orderBy';
import topCities from './1000-largest-us-cities-by-population-with-geographic-coordinates';

import { getCityNameFromRecord } from './helpers';

const yearOptions = [
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" }
];

class QueryForm extends React.Component {
  getTopCities = (topN = 1000) =>
    orderBy(
      topCities.slice(0, topN),
      record => Number(record.fields.population),
      'desc'
    );

  render() {
    return (
      <div className="query-form">
        <h3>What city and year?</h3>
        <Form state={this.props.fieldState} onChange={this.props.onChange}>
          <div className="centered-block">
            <Field
              fieldName="city"
              label="City"
              type={Select}
              placeholder="Select a city..."
              filterOption={createFilter({ignoreAccents: false})}
              styles={{
                container: provided => ({
                  ...provided,
                  width: 265,
                  marginBottom: 15
                })
              }}
              options={this.getTopCities().map(record => {
                return {
                  value: record,
                  label: getCityNameFromRecord(record)
                };
              })}
            />
            <Field
              fieldName="year"
              label="Year"
              type={DropdownField}
              options={yearOptions}
            />
          </div>
        </Form>
      </div>
    )
  }
}

export default QueryForm
