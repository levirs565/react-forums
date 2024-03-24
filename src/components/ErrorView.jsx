import React from 'react';
import PropTypes from 'prop-types';
import { AppButton } from './AppButton';
import './ErrorView.css';

export default function ErrorView({ error, onRefresh }) {
  return (
    <div className="error-view">
      <h1 className="error-view--title">Kesalahan!</h1>
      <p className="error-view--error">{error}</p>
      <AppButton
        className="error-view--reload"
        onClick={onRefresh}
        variant="primary"
      >
        Muat Ulang
      </AppButton>
    </div>
  );
}

ErrorView.propTypes = {
  onRefresh: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};
