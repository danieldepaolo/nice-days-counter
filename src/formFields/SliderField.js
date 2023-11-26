import { Slider, Typography } from '@mui/material';

const SliderField = ({
  label,
  onChange,
  marks,
  min,
  max,
  step,
  value,
  valueLabelDisplay
}) => {
  const handleChange = (event, newValue) => {
    onChange(newValue);
  };

  const id = `range-slider-${label}`;
  return (
    <div className="slider-input">
      <Typography id={id}>
        {label}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        marks={marks}
        valueLabelDisplay={valueLabelDisplay || "auto"}
        aria-labelledby={id}
        getAriaValueText={v => `${v}F`}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}

export default SliderField;
