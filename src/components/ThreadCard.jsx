import { HighlightHTML } from "./HighlightHTML";
import "./ThreadCard.css";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { MultiLineShimmer, Shimmer } from "./Shimmer";
import { useFormatDate } from "../hook";

export function ThreadCard({ id, title, body, createdAt, highlightPattern }) {
  const location = useLocation();
  const formatDate = useFormatDate();
  return (
    <li className="thread-card">
      <div className="thread-card--header">
        <h3 className="thread-card--title">
          <Link
            to={`/thread/${id}`}
            state={{
              backgroundLocation: location,
            }}
            className="thread-card--link"
          >
            <HighlightHTML text={title} pattern={highlightPattern} />
          </Link>
        </h3>
        <time className="thread-card--created-date">
          {formatDate(createdAt)}
        </time>
      </div>
      <div className="thread-card--body">
        <HighlightHTML text={body} pattern={highlightPattern} />
      </div>
    </li>
  );
}

ThreadCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  highlightPattern: PropTypes.string.isRequired,
};

export function ThreadCardShimmer({ bodyLineCount }) {
  return (
    <li className="thread-card">
      <div className="thread-card--header">
        <Shimmer>
          <h3 className="thread-card--title">Title</h3>
        </Shimmer>
        <Shimmer>
          <time className="thread-card--created-date">Date</time>
        </Shimmer>

        <MultiLineShimmer
          lineCount={bodyLineCount}
          renderItem={(index) => (
            <Shimmer key={index}>
              <p className="thread-card--body">Body</p>
            </Shimmer>
          )}
        />
      </div>
    </li>
  );
}

ThreadCardShimmer.propTypes = {
  bodyLineCount: PropTypes.number.isRequired,
};

const noteListShimmerBodyLineCount = [1, 1, 2, 2, 3, 3].sort(
  () => 0.5 - Math.random()
);

export function ThreadCardList({
  list,
  isLoading,
  highlightPattern,
  emptyMessage,
}) {
  if (isLoading)
    return (
      <ul className="thread-card-list">
        {noteListShimmerBodyLineCount.map((value, index) => (
          <ThreadCardShimmer key={index} bodyLineCount={value} />
        ))}
      </ul>
    );

  if (!list || list.length === 0) {
    return <p className="thread-card-list-empty">{emptyMessage}</p>;
  }

  return (
    <ul className="thread-card-list">
      {list.map(({ id, title, body, createdAt }) => (
        <ThreadCard
          key={id}
          id={id}
          title={title}
          body={body}
          createdAt={createdAt}
          highlightPattern={highlightPattern}
        />
      ))}
    </ul>
  );
}

ThreadCardList.propTypes = {
  list: PropTypes.array.isRequired,
  highlightPattern: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
