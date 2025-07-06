import { Box, Slider, Typography } from '@mui/material';

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
    <Box width="92%" maxWidth={700} padding="20px 15px 3px 15px">
      <Typography mb={1} variant="body2" id={id}>
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
    </Box>
  );
}

export default SliderField;
