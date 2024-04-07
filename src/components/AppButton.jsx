import React from 'react';
import { Link } from 'react-router-dom';
import './AppButton.css';
import PropTypes from 'prop-types';

export function AppButton({
  className, variant, children, onClick, disabled, isSubmit,
}) {
  return (
    <button
      className={`app-button app-button--${variant} ${
        className || ''
      }`}
      onClick={onClick}
      disabled={disabled}
      type={isSubmit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

AppButton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isSubmit: PropTypes.bool,
};

AppButton.defaultProps = {
  className: '',
  variant: 'normal',
  isSubmit: false,
  disabled: false,
  onClick: null,
};

export function AppButtonLink({
  className,
  variant,
  children,
  onClick,
  disabled,
  to,
}) {
  return (
    <Link
      className={`app-button app-button--${variant} ${
        className || ''
      }`}
      onClick={onClick}
      disabled={disabled}
      to={to}
    >
      {children}
    </Link>
  );
}

AppButtonLink.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

AppButtonLink.defaultProps = {
  className: '',
  variant: 'normal',
  onClick: null,
  disabled: false,
};

export function AppBaauttonGroupSpacer() {
  return <div className="app-button-group-spacer" />;
}

export function AppButtonGroup({ className, children }) {
  return <div className={`app-button-group ${className}`}>{children}</div>;
}

AppButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

AppButtonGroup.defaultProps = {
  className: '',
};

export function AppIconButton({
  children, onClick, hasText, isSubmit,
}) {
  return (
    <button
      className={[
        'app-icon-button',
        hasText && 'app-icon-button--has-text',
      ].join(' ')}
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}

AppIconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  hasText: PropTypes.bool,
  isSubmit: PropTypes.bool,
};

AppIconButton.defaultProps = {
  onClick: null,
  hasText: false,
  isSubmit: false,
};

export function AppIconButtonText({ children }) {
  return <span className="app-icon-button--text">{children}</span>;
}

AppIconButtonText.propTypes = {
  children: PropTypes.node.isRequired,
};
