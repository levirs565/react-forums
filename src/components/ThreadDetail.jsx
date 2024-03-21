import { MultiLineShimmer, Shimmer } from "./Shimmer";
import PropTypes from "prop-types";
import htmlToReact from "html-react-parser";
import { useFormatDate } from "../hook";
import "./ThreadDetail.css";
import { VoteButtonGroup } from "./Vote";

export function ThreadDetailShimmer({ bodyLineCount }) {
  return (
    <div className="thread-detail">
      <Shimmer>
        <h1 className="thread-detail--title">Title</h1>
      </Shimmer>
      <Shimmer>
        <time className="thread-detail--date">Date</time>
      </Shimmer>
      <MultiLineShimmer
        lineCount={bodyLineCount}
        renderItem={(index) => (
          <Shimmer key={index}>
            <p className="thread-detail--body">Body</p>
          </Shimmer>
        )}
      />
    </div>
  );
}

ThreadDetailShimmer.propTypes = {
  bodyLineCount: PropTypes.number.isRequired,
};

export function ThreadDetial({
  title,
  createdAt,
  body,
  upVoteCount,
  downVoteCount,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
  isUpVoted,
  isDownVoted,
}) {
  const formatDate = useFormatDate();
  return (
    <div className="thread-detail">
      <h1 className="thread-detail--title">{title}</h1>
      <time className="thread-detail--date">{formatDate(createdAt)}</time>
      <div className="thread-detail--body">{htmlToReact(body)}</div>
      <VoteButtonGroup
        className="thread-detail--footer"
        upVoteCount={upVoteCount}
        downVoteCount={downVoteCount}
        isUpVoted={isUpVoted}
        isDownVoted={isDownVoted}
        onUpVote={onUpVote}
        onDownVote={onDownVote}
        onNeutralizeVote={onNeutralizeVote}
      />
    </div>
  );
}

ThreadDetial.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  upVoteCount: PropTypes.number.isRequired,
  downVoteCount: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};
