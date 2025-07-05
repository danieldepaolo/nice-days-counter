import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import omit from "lodash/omit";

import NoWrap from "../ui/NoWrap";

import { SELECT_OPTION_HEIGHT } from "../../util/constants";

const CustomOption = ({
  children,
  getStyles,
  innerRef,
  innerProps,
  value,
  isSelected,
  ...props
}) => {
  const optionStyles = {
    height: SELECT_OPTION_HEIGHT,
    bgcolor: isSelected ? 'rgb(162, 162, 235)' : undefined,

    '&:hover': {
      bgcolor: '#deebff'
    },

    ...omit(getStyles("option", props), ["backgroundColor", "color"]),
  };

  const fasterInnerProps = {
    ...innerProps,
    onMouseMove: undefined,
    onMouseOver: undefined,
  };

  return (
    <Box
      ref={innerRef}
      sx={optionStyles}
      {...fasterInnerProps}
    >
      <NoWrap>{children}</NoWrap>
      <Typography variant="caption" color={grey[600]}>
        Population: {value.population.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default CustomOption
