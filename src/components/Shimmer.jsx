import "./Shimmer.css";
import PropTypes from "prop-types";

export function Shimmer({ className, children, isNotFill }) {
  return (
    <div
      className={[
        "shimmer",
        isNotFill ? "shimmer--not-fill" : "",
        className,
      ].join(" ")}
      inert=""
    >
      {children}
    </div>
  );
}

Shimmer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isNotFill: PropTypes.bool,
};

export function InnerShimmer({ className, children }) {
  return (
    <Shimmer className={["shimmer--inner", className].join(" ")}>
      {children}
    </Shimmer>
  );
}

InnerShimmer.propTypes = {
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
