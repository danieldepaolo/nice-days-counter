import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import omit from "lodash/omit";

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
  const noWrapEllipsis = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const optionStyles = {
    height: SELECT_OPTION_HEIGHT,
    ...omit(getStyles("option", props), ["backgroundColor", "color"]),
  };

  const fasterInnerProps = {
    ...innerProps,
    onMouseMove: undefined,
    onMouseOver: undefined,
  };

  return (
    <div
      ref={innerRef}
      className={`custom-option${isSelected ? ' custom-option--is-selected' : ''}`}
      style={optionStyles}
      {...fasterInnerProps}
    >
      <div style={noWrapEllipsis}>{children}</div>
      <Typography variant="caption" color={grey[600]}>
        Population: {value.population.toLocaleString()}
      </Typography>
    </div>
  );
};

export default CustomOption
