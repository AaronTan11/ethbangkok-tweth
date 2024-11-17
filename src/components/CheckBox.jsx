import React from 'react';

export const Checkbox = (props) => {
  return (
    <div>
      <input
        id={props.id}
        type="checkbox"
        checked={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};