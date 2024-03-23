import PropTypes from "prop-types";
import "./Category.css";
import { useMemo } from "react";
import { Shimmer } from "./Shimmer";

export function Category({
  className,
  as,
  text,
  isSelectable,
  isSelected,
  onClick,
}) {
  const As = as;

  return (
    <As
      className={[
        "category",
        isSelectable ? "category--selectable" : "",
        isSelected ? "category--selected" : "",
        className,
      ].join(" ")}
      onClick={onClick}
    >
      #{text}
    </As>
  );
}

Category.propTypes = {
  className: PropTypes.string,
  as: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isSelectable: PropTypes.bool,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export function CategorySelectionList({ list, selected, onSelected }) {
  return (
    <ul className="category-list">
      {list.map((category) => (
        <Category
          key={category}
          as="li"
          text={category}
          isSelectable
          isSelected={selected === category}
          onClick={() =>
            selected === category ? onSelected(null) : onSelected(category)
          }
        />
      ))}
    </ul>
  );
}

CategorySelectionList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string,
  onSelected: PropTypes.func.isRequired,
};

export function CategoryListShimmer({ count }) {
  const list = useMemo(() => new Array(count).fill(0), [count]);
  return (
    <div className="category-list">
      {list.map((_, index) => (
        <Shimmer key={index}>
          <Category as="span" text="Category" />
        </Shimmer>
      ))}
    </div>
  );
}

CategoryListShimmer.propTypes = {
  count: PropTypes.number.isRequired,
};
