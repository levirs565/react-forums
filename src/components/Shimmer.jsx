import "./Shimmer.css";
import PropTypes from "prop-types";

export function Shimmer({ className, children }) {
  return (
    <div className={["shimmer", className].join(" ")} inert="">
      {children}
    </div>
  );
}

Shimmer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export function MultiLineShimmer({ renderItem, lineCount }) {
  return (
    <div className="multiline-shimmer">
      {new Array(lineCount).fill(0).map((_, index) => renderItem(index))}
    </div>
  );
}

MultiLineShimmer.propTypes = {
  renderItem: PropTypes.func.isRequired,
  lineCount: PropTypes.number.isRequired,
};
