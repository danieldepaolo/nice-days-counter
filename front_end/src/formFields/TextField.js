import React from 'react';

class TextField extends React.Component {
  onValueChanged = e => {
    const { value } = e.target;
    this.props.onChange(this.props.isNum ? Number(value) : value);
  }

  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.onValueChanged}
      />
    );
  } 
}

export default TextField;
