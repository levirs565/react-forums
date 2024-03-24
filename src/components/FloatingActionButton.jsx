import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FloatingActionButton.css';

export default function FloatingActionButton({ children, to }) {
  return (
    <Link className="floating-action-button" to={to}>
      {children}
    </Link>
  );
}

FloatingActionButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};
