import React from 'react';

const Dropdown = ({
  style,
  label,
  value,
  width,
  options,
  onChange,
}) => {
  return (
    <label style={{ display: 'flex', gap: 8, ...style }}>
      {label}
      <select value={value} onChange={onChange} style={{ width: width }}>
        {options.map((option) => (
          <option key={`option: ${option.label}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;