import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

class DropdownField extends React.Component {
  handleChange = event => {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <FormControl>
        <InputLabel id={`${this.props.id}-label`}>
          {this.props.label}
        </InputLabel>
        <Select
          labelId={`${this.props.id}-label`}
          id={this.props.id}
          value={this.props.value}
          onChange={this.handleChange}
        >
          {this.props.options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default DropdownField;
