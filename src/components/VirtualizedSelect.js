import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import Select from "react-select";
import { List } from "react-virtualized";

const ROW_HEIGHT = 50;

const CustomOption = ({
  children,
  getStyles,
  innerRef,
  innerProps,
  value,
  ...props
}) => {
  const noWrapEllipsis = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }

  const optionStyles = {
    height: ROW_HEIGHT,
    ...getStyles("option", props),
  };

  return (
    <div ref={innerRef} style={optionStyles} {...innerProps}>
      <div style={{ ...noWrapEllipsis }}>{children}</div>
      <Typography variant="caption" color={grey[500]}>
        Population: {value.fields.population}
      </Typography>
    </div>
  );
};

const VirtualizedMenuList = (props) => {
  function rowRenderer({ key, index, style }) {
    const child = props.children[index];

    const gridItemStyles = {
      width: "100%",
      ...style,
    };

    return (
      <div key={key} style={gridItemStyles}>
        {child}
      </div>
    );
  }

  return (
    <List
      height={props.maxHeight}
      width={300}
      rowCount={props.options.length}
      rowHeight={ROW_HEIGHT}
      rowRenderer={rowRenderer}
      overscanRowCount={10}
      style={{ width: "100%" }}
    />
  );
};

const VirtualizedSelect = ({ ...selectProps }) => {
  return (
    <Select
      {...selectProps}
      components={{ MenuList: VirtualizedMenuList, Option: CustomOption }}
    />
  );
};

export default VirtualizedSelect;
