import React from 'react';
import {Form, Field} from 'simple-react-form';
import SliderField from './formFields/SliderField';

const tempMarks = [
  {value: 30, label: "30F"},
  {value: 50, label: "50F"},
  {value: 70, label: "70F"},
  {value: 85, label: "85F"},
  {value: 100, label: "100F"}
];

const precipIntensityMarks = [
  {value: 0, label: "0"},
  {value: 0.01, label: "0.01"},
  {value: 0.05, label: "0.05"},
  {value: 0.1, label: "0.1"}
];

const cloudCoverMarks = [
  {value: 0, label: "Clear"},
  {value: 1, label: "1"},
  {value: 2, label: "2"},
  {value: 3, label: "3"},
  {value: 4, label: "4"},
  {value: 5, label: "5"},
  {value: 6, label: "6"},
  {value: 7, label: "7"},
  {value: 8, label: "Overcast"},
];

class NiceDayForm extends React.Component {
  render() {
    return (
      <div>
        <h3 className="nice-day-form-header">What is a "nice day"?</h3>
        <Form
          state={this.props.fieldState}
          onChange={this.props.onChange}
        >
          <Field
            fieldName="tempRange"
            label={'"Feels-like" Temperature Range'}
            marks={tempMarks}
            min={30}
            type={SliderField}
          />
          <Field
            fieldName="maxCloudCover"
            label="Max Cloud Cover (oktas)"
            marks={cloudCoverMarks}
            min={0}
            max={8}
            step={null}
            type={SliderField}
          />
          <Field
            fieldName="maxPrecipIntensity"
            label="Max Precipitation Intensity (inches)"
            marks={precipIntensityMarks}
            min={0}
            max={0.1}
            step={0.005}
            type={SliderField}
          />
        </Form>
      </div>
    )
  }
}

export default NiceDayForm
