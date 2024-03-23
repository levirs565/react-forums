import PropTypes from "prop-types";
import "./Category.css";

export function Category({ className, as, text }) {
  const As = as;

  return <As className={["category", className].join(" ")}>#{text}</As>;
}

Category.propTypes = {
  className: PropTypes.string,
  as: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
