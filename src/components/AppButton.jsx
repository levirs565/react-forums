import "./AppButton.css";
import PropTypes from "prop-types";

export function AppButton({ className, variant, children, onClick, disabled }) {
  return (
    <button
      className={`app-button app-button--${variant ?? "normal"} ${
        className ? className : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

AppButton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export function AppButtonGroupSpacer() {
  return <div className="app-button-group-spacer"></div>;
}

export function AppButtonGroup({ className, children }) {
  return <div className={`app-button-group ${className}`}>{children}</div>;
}

AppButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export function AppIconButton({ children, onClick, hasText }) {
  return (
    <button
      className={[
        "app-icon-button",
        hasText && "app-icon-button--has-text",
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

AppIconButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  hasText: PropTypes.bool,
};

export function AppIconButtonText({ children }) {
  return <span className="app-icon-button--text">{children}</span>;
}

AppIconButtonText.propTypes = {
  children: PropTypes.node,
};
