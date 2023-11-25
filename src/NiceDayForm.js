import React from 'react';
import SliderField from './formFields/SliderField';

const tempMarks = [
  {value: 30, label: "30F"},
  {value: 50, label: "50F"},
  {value: 70, label: "70F"},
  {value: 85, label: "85F"},
  {value: 100, label: "100F"}
];

const totalPrecipMarks = [
  {value: 0.01, label: "Very Light"},
  {value: 0.1, label: "Light"},
  {value: 0.5, label: "Moderate"},
  {value: 1, label: "Heavy"}
];

const NiceDayForm = ({ fieldState, handleChange }) =>
  <div>
    <h4 className="nice-day-form-header">What is a "nice day"?</h4>
      <SliderField
        name="tempRange"
        label='High "Feels-like" Temperature Range'
        marks={tempMarks}
        min={30}
        onChange={value => handleChange("tempRange", value)}
        value={fieldState.tempRange}
      />
      <SliderField
        name="maxPrecip"
        label="Highest Allowed Precipitation Amount (inches)"
        marks={totalPrecipMarks}
        min={0.01}
        max={1}
        step={0.1}
        onChange={value => handleChange("maxPrecip", value)}
        value={fieldState.maxPrecip}
      />
  </div>

export default NiceDayForm
