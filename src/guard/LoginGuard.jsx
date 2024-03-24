import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserState } from '../slices/auth';

export function LoggedInGuard({ children }) {
  const { user, loading } = useSelector(selectUserState);

  if (loading) return null;

  if (!user) return <Navigate to="/" />;

  return children;
}

LoggedInGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export function NotLoggedInGuard({ children }) {
  const { user, loading } = useSelector(selectUserState);

  if (loading) return null;

  if (user) return <Navigate to="/" />;

  return children;
}

NotLoggedInGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
