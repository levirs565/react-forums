import PropTypes from "prop-types";
import "./CardForm.css";

export function CardForm({ children, isFluid, ...rest }) {
  return (
    <div className={["card-form", isFluid ? "card-form--fluid" : ""].join(" ")}>
      <form className="card-form--form" {...rest}>
        {children}
      </form>
    </div>
  );
}

CardForm.propTypes = {
  children: PropTypes.node,
  isFluid: PropTypes.bool,
};

export function CardFormTitle({ children }) {
  return <h1 className="card-form--title">{children}</h1>;
}

CardFormTitle.propTypes = {
  children: PropTypes.node,
};

export function CardFormHeader({ children }) {
  return <div className="card-form--header">{children}</div>;
}

CardFormHeader.propTypes = {
  children: PropTypes.node,
};

export function CardFormContent({ children }) {
  return <div className="card-form--content">{children}</div>;
}

CardFormContent.propTypes = {
  children: PropTypes.node,
};

export function CardFormFooter({ children }) {
  return <div className="card-form--footer">{children}</div>;
}

CardFormFooter.propTypes = {
  children: PropTypes.node,
};

export function CardFormMessage({ children }) {
  return <p className="card-form--message">{children}</p>;
}

CardFormMessage.propTypes = {
  children: PropTypes.node,
};
