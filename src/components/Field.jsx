import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import { AppInput, AppInputContainer } from './AppInput';
import './Field.css';

const InputIdContext = React.createContext();

export function FieldInput(
  { className, type, ...rest },
) {
  const { field } = useController(rest);
  const inputId = useContext(InputIdContext);
  return (
    <AppInputContainer>
      <AppInput
        className={`field--input ${className || ''}`}
        id={inputId}
        ref={field.ref}
        value={field.value}
        disabled={field.disabled}
        onBlur={field.onBlur}
        onChange={field.onChange}
        type={type}
      />
    </AppInputContainer>
  );
}

FieldInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

FieldInput.defaultProps = {
  className: null,
  type: null,
};

// onClick hanya agar saat label di klik bisa focus ke content editable
export function FieldLabel({ children, onClick }) {
  const inputId = useContext(InputIdContext);
  return (
    /* eslint-disable-next-line
    jsx-a11y/no-noninteractive-element-interactions,
    jsx-a11y/click-events-have-key-events
    */
    <label className="field--label" htmlFor={inputId} onClick={onClick}>
      {children}
    </label>
  );
}

FieldLabel.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

FieldLabel.defaultProps = {
  onClick: null,
};

export function FieldMessage({ children, error }) {
  return (
    <p className={`field--message ${error ? 'field--message--error' : ''}`}>
      {children}
    </p>
  );
}

FieldMessage.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.bool,
};

FieldMessage.defaultProps = {
  error: false,
};

export function ReactHookFieldMessage({ error }) {
  return error && <FieldMessage error>{error.message}</FieldMessage>;
}

ReactHookFieldMessage.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string.isRequired }),

};

ReactHookFieldMessage.defaultProps = {
  error: null,
};

export function Field({ inputId, children }) {
  return (
    <InputIdContext.Provider value={inputId}>
      <div className="field">{children}</div>
    </InputIdContext.Provider>
  );
}

Field.propTypes = {
  inputId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
