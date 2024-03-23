import PropTypes from "prop-types";
import "./Category.css";

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
