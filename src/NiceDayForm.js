import React from 'react';
import SliderField from './formFields/SliderField';
import { Box, Typography } from '@mui/material';

const tempMarks = [
  {value: 30, label: "30F"},
  {value: 50, label: "50F"},
  {value: 70, label: "70F"},
  {value: 85, label: "85F"},
  {value: 100, label: "100F"}
];

const totalPrecipMarks = [
  {value: 0.01, label: "~None"},
  {value: 0.2, label: "Light"},
  {value: 0.4, label: "Moderate"},
  {value: 0.8, label: "Heavy"}
];

const sunshineDurationMarks = [
  {value: 0, label: "No sun"},
  {value: 2, label: "A taste"},
  {value: 4, label: "Moderate"},
  {value: 8, label: "All day"}
]

const NiceDayForm = ({ fieldState, handleChange }) =>
  <div>
    <Typography variant="h5">Define "Nice Day"</Typography>
    <Box display="flex" flexDirection="column" gap={2}>
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
        label="Highest Allowed Rain Total (inches)"
        marks={totalPrecipMarks}
        min={0.01}
        max={1}
        step={0.1}
        onChange={value => handleChange("maxPrecip", value)}
        value={fieldState.maxPrecip}
      />
      <SliderField
        name="minSunshineDuration"
        label='Minimum Sunshine Duration (hours)'
        marks={sunshineDurationMarks}
        min={0}
        max={8}
        onChange={value => handleChange("minSunshineDuration", value)}
        value={fieldState.minSunshineDuration}
      />
    </Box>
  </div>

export default NiceDayForm
