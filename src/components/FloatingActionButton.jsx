import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./FloatingActionButton.css";

export function FloatingActionButton({ children, ...props }) {
  return (
    <Link className="floating-action-button" {...props}>
      {children}
    </Link>
  );
}

FloatingActionButton.propTypes = {
  children: PropTypes.node,
};
