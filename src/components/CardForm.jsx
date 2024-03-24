import React from 'react';
import PropTypes from 'prop-types';
import './CardForm.css';

export function CardForm({
  children, isFluid, isSurface, onSubmit,
}) {
  return (
    <div
      className={[
        'card-form',
        isFluid ? 'card-form--fluid' : '',
        isSurface ? 'card-form--surface' : '',
      ].join(' ')}
    >
      <form className="card-form--form" onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
}

CardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isFluid: PropTypes.bool,
  isSurface: PropTypes.bool,
};

CardForm.defaultProps = {
  isFluid: false,
  isSurface: false,
};

export function CardFormTitle({ children }) {
  return <h1 className="card-form--title">{children}</h1>;
}

CardFormTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export function CardFormHeader({ children }) {
  return <div className="card-form--header">{children}</div>;
}

CardFormHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export function CardFormContent({ children }) {
  return <div className="card-form--content">{children}</div>;
}

CardFormContent.propTypes = {
  children: PropTypes.node.isRequired,
};

export function CardFormFooter({ children }) {
  return <div className="card-form--footer">{children}</div>;
}

CardFormFooter.propTypes = {
  children: PropTypes.node.isRequired,
};

export function CardFormMessage({ children }) {
  return <p className="card-form--message">{children}</p>;
}

CardFormMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
