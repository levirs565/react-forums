import { HighlightHTML } from "./HighlightHTML";
import "./ThreadCard.css";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { MultiLineShimmer, Shimmer } from "./Shimmer";
import { useFormatDate } from "../hook";
import { VoteButtonGroup } from "./Vote";
import { UserInformation, UserInformationShimmer } from "./UserInformation";
import { Category } from "./Category";

export function ThreadCard({
  id,
  title,
  body,
  createdAt,
  upVoteCount,
  downVoteCount,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
  isUpVoted,
  isDownVoted,
  highlightPattern,
  owner,
  category,
}) {
  const location = useLocation();
  const formatDate = useFormatDate();
  return (
    <li className="thread-card">
      <div className="thread-card--header">
        <UserInformation avatar={owner.avatar} name={owner.name} />
        <div className="dot-divider"></div>
        <time className="thread-card--created-date">
          {formatDate(createdAt)}
        </time>
      </div>
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
      <div className="thread-card--category">
        <Category as="span" text={category} />
      </div>
      <div className="thread-card--body">
        <HighlightHTML text={body} pattern={highlightPattern} />
      </div>
      <VoteButtonGroup
        className="thread-card--footer"
        upVoteCount={upVoteCount}
        downVoteCount={downVoteCount}
        isUpVoted={isUpVoted}
        isDownVoted={isDownVoted}
        onUpVote={() => onUpVote(id)}
        onDownVote={() => onDownVote(id)}
        onNeutralizeVote={() => onNeutralizeVote(id)}
      />
    </li>
  );
}

ThreadCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  highlightPattern: PropTypes.string.isRequired,
  upVoteCount: PropTypes.number.isRequired,
  downVoteCount: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
  owner: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
};

export function ThreadCardShimmer({ bodyLineCount }) {
  return (
    <li className="thread-card">
      <div className="thread-card--header">
        <UserInformationShimmer />
        <Shimmer>
          <time className="thread-card--created-date">Date</time>
        </Shimmer>
      </div>

      <Shimmer>
        <h3 className="thread-card--title">Title</h3>
      </Shimmer>

      <div className="thread-card--category">
        <Shimmer isNotFill>
          <Category as="span" text="Category" />
        </Shimmer>
      </div>

      <MultiLineShimmer
        lineCount={bodyLineCount}
        renderItem={(index) => (
          <Shimmer key={index}>
            <p className="thread-card--body">Body</p>
          </Shimmer>
        )}
      />
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
  onDownVote,
  onUpVote,
  onNeutralizeVote,
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
      {list.map(
        ({
          id,
          title,
          body,
          createdAt,
          owner,
          category,
          upVoteCount,
          downVoteCount,
          isUpVoted,
          isDownVoted,
        }) => (
          <ThreadCard
            key={id}
            id={id}
            title={title}
            body={body}
            createdAt={createdAt}
            owner={owner}
            category={category}
            highlightPattern={highlightPattern}
            upVoteCount={upVoteCount}
            downVoteCount={downVoteCount}
            isUpVoted={isUpVoted}
            isDownVoted={isDownVoted}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            onNeutralizeVote={onNeutralizeVote}
          />
        )
      )}
    </ul>
  );
}

ThreadCardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  highlightPattern: PropTypes.string.isRequired,
  emptyMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};
