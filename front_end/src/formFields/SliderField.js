import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class SliderField extends React.Component {
  handleChange = (event, newValue) => {
    this.props.onChange(newValue);
  };

  render() {
    const id = `range-slider-${this.props.label}`;
    return (
      <div className="slider-input">
        <Typography id={id}>
          {this.props.label}
        </Typography>
        <Slider
          value={this.props.value}
          onChange={this.handleChange}
          marks={this.props.marks}
          valueLabelDisplay={this.props.valueLabelDisplay || "auto"}
          aria-labelledby={id}
          getAriaValueText={v => `${v}F`}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
        />
      </div>
    );
  }
}

export default SliderField;
