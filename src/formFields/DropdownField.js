import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DropdownField = ({ id, label, onChange, options, value }) => {
  const handleChange = event => {
    onChange(event.target.value);
  }

  return (
    <FormControl variant='outlined'>
      <InputLabel id={`${id}-label`}>
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        label={label}
        id={id}
        value={value}
        onChange={handleChange}
      >
        {options.map(option =>
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}

export default DropdownField;
