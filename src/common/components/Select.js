import React from 'react';
import PropTypes from 'prop-types';

export default function Select ({id, label, options = [], onChange = () => {}}) {

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="field">
        <select id={id} onChange={onChange}>
          <option value="">---</option>
          { options.map(o => <option key={o.label} value={o.value}>{o.label}</option>) }
        </select>
        <div className="chevron-wrapper flex">
          <svg
            className="chevron"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </>
  );
}

Select.propTypes = {
  id: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired
}
