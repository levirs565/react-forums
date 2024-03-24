import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './FancyLink.css';

export default function FancyLink({ to, children }) {
  return (
    <Link className="fancy-link" to={to}>
      {children}
    </Link>
  );
}

FancyLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
