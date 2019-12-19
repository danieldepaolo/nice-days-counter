import React from 'react';
import {Form, Field} from 'simple-react-form';
import DropdownField from './formFields/DropdownField';
import { cityDataMap } from './cities';

const yearOptions = [
  { value: "2019", label: "2019" },
  { value: "2018", label: "2018" },
  { value: "2017", label: "2017" },
  { value: "2016", label: "2016" },
  { value: "2015", label: "2015" }
];

class QueryForm extends React.Component {
  render() {
    return (
      <div className="query-form">
        <h3>What city and year?</h3>
        <Form state={this.props.fieldState} onChange={this.props.onChange}>
          <Field
            fieldName="city"
            label="City"
            type={DropdownField}
            options={Object.keys(cityDataMap).map(city => {
              const cityData = cityDataMap[city];
              return {
                value: city,
                label: cityData.title
              };
            })}
          />
          <Field
            fieldName="year"
            label="Year"
            type={DropdownField}
            options={yearOptions}
          />
        </Form>
      </div>
    )
  }
}

export default QueryForm
