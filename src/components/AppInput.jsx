import React, { forwardRef } from 'react';
import './AppInput.css';
import PropTypes from 'prop-types';

// onClick hanya digunakan untuk memfokuskan ke input di dalam kontainer
export function AppInputContainer({ className, children, onClick }) {
  return (
    /* eslint-disable-next-line
    jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions
    */
    <div
      className={`app-input ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

AppInputContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

AppInputContainer.defaultProps = {
  className: '',
  children: null,
  onClick: () => {},
};

export const AppInput = forwardRef((
  {
    as, className, value, disabled, onBlur, onChange, type, children,
  },
  ref,
) => {
  const Component = as;
  return (
    <Component
      className={['app-input--input', className].join(' ')}
      ref={ref}
      value={value}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      type={type}
    >
      {children}
    </Component>
  );
});

AppInput.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node,
};

AppInput.defaultProps = {
  as: 'input',
  className: '',
  value: '',
  disabled: false,
  onBlur: null,
  onChange: null,
  type: null,
  children: null,
};
