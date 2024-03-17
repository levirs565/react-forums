import PropTypes from "prop-types";
import "./Popup.css";

export function Popup({ children }) {
  return <div className="popup">{children}</div>;
}

Popup.propTypes = {
  children: PropTypes.node,
};

export function PopupContent({ children }) {
  return <div className="popup--content">{children}</div>;
}

PopupContent.propTypes = {
  children: PropTypes.node,
};

export function PopupItem({ children, clickable, onClick }) {
  const As = clickable ? "button" : "div";
  return (
    <As
      className={["popup-item", clickable ? "popup-item--clickable" : ""].join(
        " "
      )}
      onClick={onClick}
    >
      {children}
    </As>
  );
}

PopupItem.propTypes = {
  children: PropTypes.node,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
};

export function PopupItemIcon({ children }) {
  return <div className="popup-item--icon">{children}</div>;
}

PopupItemIcon.propTypes = {
  children: PropTypes.node,
};

export function PopupItemText({ children }) {
  return <div className="popup-item--text">{children}</div>;
}

PopupItemText.propTypes = {
  children: PropTypes.node,
};
