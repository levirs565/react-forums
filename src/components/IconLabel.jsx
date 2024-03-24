import React from 'react';
import PropTypes from 'prop-types';
import './IconLabel.css';

export function IconLabel({ children }) {
  return <div className="icon-label">{children}</div>;
}

IconLabel.propTypes = {
  children: PropTypes.node.isRequired,

};

export function IconLabelText({ children }) {
  return <span className="icon-label--text">{children}</span>;
}

IconLabelText.propTypes = {
  children: PropTypes.node.isRequired,
};
