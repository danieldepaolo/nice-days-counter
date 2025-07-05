
import Select from "react-select";
import { List } from "react-virtualized";

import { SELECT_OPTION_HEIGHT } from "../../util/constants";

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
      rowCount={props.children?.length || 0}
      rowHeight={SELECT_OPTION_HEIGHT}
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
      components={{ ...selectProps.components, MenuList: VirtualizedMenuList }}
    />
  );
};

export default VirtualizedSelect;
