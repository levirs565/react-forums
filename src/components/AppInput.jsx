import { forwardRef } from "react";
import "./AppInput.css";
import PropTypes from "prop-types";

export function AppInputContainer({ className, children, onClick }) {
  return (
    <div
      className={`app-input ${className ? className : ""}`}
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
