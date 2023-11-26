import React from 'react';
import SliderField from './formFields/SliderField';
import { Typography } from '@mui/material';

const tempMarks = [
  {value: 30, label: "30F"},
  {value: 50, label: "50F"},
  {value: 70, label: "70F"},
  {value: 85, label: "85F"},
  {value: 100, label: "100F"}
];

const totalPrecipMarks = [
  {value: 0.01, label: "Very light"},
  {value: 0.1, label: "Light"},
  {value: 0.5, label: "Moderate"},
  {value: 1, label: "Heavy"}
];

const sunshineDurationMarks = [
  {value: 0, label: "No sun"},
  {value: 2, label: "A taste of sun"},
  {value: 4, label: "Moderate sun"},
  {value: 8, label: "Lots of sun"}
]

const NiceDayForm = ({ fieldState, handleChange }) =>
  <div>
    <Typography variant="h5">Define "Nice Day"</Typography>
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
      <SliderField
        name="minSunshineDuration"
        label='Minimum sunshine duration (hours)'
        marks={sunshineDurationMarks}
        min={0}
        max={8}
        onChange={value => handleChange("minSunshineDuration", value)}
        value={fieldState.minSunshineDuration}
      />
  </div>

export default NiceDayForm
