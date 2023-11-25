const TextField = ({ isNum, onChange, value }) => {
  const onValueChanged = e => {
    const { value } = e.target;
    onChange(isNum ? Number(value) : value);
  }

  return (
    <input
      type="text"
      value={value}
      onChange={onValueChanged}
    />
  );
}

export default TextField;
