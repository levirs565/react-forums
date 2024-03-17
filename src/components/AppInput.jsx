import { forwardRef } from "react";
import "./AppInput.css";
import PropTypes from "prop-types";

export function AppInputContainer({ className, children }) {
  return (
    <div className={`app-input ${className ? className : ""}`}>{children}</div>
  );
}

AppInputContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const AppInput = forwardRef(function AppInput(
  { as, className, ...rest },
  ref
) {
  const Component = as ? as : "input";
  return (
    <Component
      className={["app-input--input", className ?? ""].join(" ")}
      {...rest}
      ref={ref}
    />
  );
});

AppInput.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
};
