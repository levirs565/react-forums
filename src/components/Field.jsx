import React, { forwardRef, useContext } from "react";
import { AppInput, AppInputContainer } from "./AppInput";
import PropTypes from "prop-types";
import "./Field.css";

const InputIdContext = React.createContext();

export const FieldInput = forwardRef(function FieldInput(
  { className, ...rest },
  ref
) {
  const inputId = useContext(InputIdContext);
  return (
    <AppInputContainer>
      <AppInput
        className={`field--input ${className ? className : ""}`}
        id={inputId}
        {...rest}
        ref={ref}
      />
    </AppInputContainer>
  );
});

FieldInput.propTypes = {
  className: PropTypes.string,
};

export function FieldLabel({ children, onClick }) {
  const inputId = useContext(InputIdContext);
  return (
    <label className="field--label" htmlFor={inputId} onClick={onClick}>
      {children}
    </label>
  );
}

FieldLabel.propTypes = {
  children: PropTypes.node,
  onFocus: PropTypes.func,
};

export function FieldMessage({ children, error }) {
  return (
    <p className={`field--message ${error ? "field--message--error" : ""}`}>
      {children}
    </p>
  );
}

FieldMessage.propTypes = {
  children: PropTypes.node,
  error: PropTypes.bool,
};

export function ReactHookFieldMessage({ error }) {
  return error && <FieldMessage error>{error.message}</FieldMessage>;
}

ReactHookFieldMessage.propTypes = {
  error: PropTypes.object,
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
  children: PropTypes.node,
};
