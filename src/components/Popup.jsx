import React from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

export function Popup({ children }) {
  return <div className="popup">{children}</div>;
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
};

export function PopupContent({ children }) {
  return <div className="popup--content">{children}</div>;
}

PopupContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export function PopupItem({
  children, clickable, onClick, isHeader,
}) {
  const As = clickable ? 'button' : 'div';
  return (
    <As
      className={[
        'popup-item',
        clickable ? 'popup-item--clickable' : '',
        isHeader ? 'popup-item--is-header' : '',
      ].join(' ')}
      onClick={onClick}
    >
      {children}
    </As>
  );
}

PopupItem.propTypes = {
  children: PropTypes.node.isRequired,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  isHeader: PropTypes.bool,
};

PopupItem.defaultProps = {
  clickable: false,
  onClick: null,
  isHeader: false,
};

export function PopupItemIcon({ children }) {
  return <div className="popup-item--icon">{children}</div>;
}

PopupItemIcon.propTypes = {
  children: PropTypes.node.isRequired,
};

export function PopupItemText({ children }) {
  return <div className="popup-item--text">{children}</div>;
}

PopupItemText.propTypes = {
  children: PropTypes.node.isRequired,
};
