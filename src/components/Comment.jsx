import PropTypes from "prop-types";
import renderHtml from "html-react-parser";
import "./Comment.css";
import { InnerShimmer, MultiLineShimmer, Shimmer } from "./Shimmer";
import { useMemo } from "react";

function CommentItem({ owner, content }) {
  return (
    <li className="comment">
      <div className="comment--header">
        <img className="comment--avatar" src={owner.avatar} />
        <p className="comment--owner">{owner.name}</p>
      </div>
      <div className="comment--body">{renderHtml(content)}</div>
    </li>
  );
}

CommentItem.propTypes = {
  owner: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
};

function CommentItemShimmer({ contentLineCount }) {
  return (
    <li className="comment">
      <div className="comment--header">
        <div className="comment--avatar">
          <InnerShimmer />
        </div>
        <Shimmer>
          <p className="comment--owner">Owner</p>
        </Shimmer>
      </div>
      <MultiLineShimmer
        lineCount={contentLineCount}
        renderItem={(index) => (
          <Shimmer key={index}>
            <p className="comment-body">Content</p>
          </Shimmer>
        )}
      />
    </li>
  );
}

CommentItemShimmer.propTypes = {
  contentLineCount: PropTypes.number.isRequired,
};

export function CommentList({ list }) {
  if (!list || list.length == 0) return <p>Komentar Kosong</p>;
  return (
    <ul className="comment-list">
      {list.map((comment) => (
        <CommentItem
          key={comment.id}
          owner={comment.owner}
          content={comment.content}
        />
      ))}
    </ul>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export function CommentListShimmer() {
  const lineCount = useMemo(
    () => [1, 1, 2, 2, 3, 3].sort(() => 0.5 - Math.random()),
    []
  );

  return (
    <ul className="comment-list">
      {lineCount.map((value, index) => (
        <CommentItemShimmer key={index} contentLineCount={value} />
      ))}
    </ul>
  );
}
