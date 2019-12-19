import React from 'react';
import { Slider, Typography } from '@material-ui/core';

class SliderField extends React.Component {
  handleChange = (event, newValue) => {
    this.props.onChange(newValue);
  };

  render() {
    return (
      <div className="slider-input">
        <Slider
          value={this.props.value}
          onChange={this.handleChange}
          marks={this.props.marks}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={v => `${v}F`}
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          valueLabelDisplay={this.props.valueLabelDisplay || "auto"}
        />
        <Typography id="range-slider">
          {this.props.label}
        </Typography>
      </div>
    );
  }
}

export default SliderField;
