import PropTypes from "prop-types";
import renderHtml from "html-react-parser";
import "./Comment.css";
import { InnerShimmer, MultiLineShimmer, Shimmer } from "./Shimmer";
import { useMemo } from "react";
import { ContentEditableInput } from "./ContentEditable";
import {
  AppButton,
  AppButtonGroup,
  AppButtonGroupSpacer,
  AppIconButton,
  AppIconButtonText,
} from "./AppButton";
import {
  ArrowUpCircleIcon,
  ArrowUpCircleIconFilled,
} from "../icons/ArrowUpCircleIcon";
import { ArrowDownCircleIcon } from "../icons/ArrowDownCircleIcon";

function CommentItem({
  id,
  owner,
  content,
  upVoteCount,
  downVoteCount,
  onUpVote,
  onDownVote,
  isUpVoted,
  isDownVoted,
}) {
  return (
    <li className="comment">
      <div className="comment--header">
        <img className="comment--avatar" src={owner.avatar} />
        <p className="comment--owner">{owner.name}</p>
      </div>
      <div className="comment--body">{renderHtml(content)}</div>
      <AppButtonGroup className="comment--footer">
        <AppIconButton hasText onClick={() => onUpVote(id)}>
          {isUpVoted ? <ArrowUpCircleIconFilled /> : <ArrowUpCircleIcon />}
          <AppIconButtonText>{upVoteCount}</AppIconButtonText>
        </AppIconButton>
        <AppIconButton hasText onClick={() => onDownVote(id)}>
          {isDownVoted ? <ArrowUpCircleIconFilled /> : <ArrowDownCircleIcon />}
          <AppIconButtonText>{downVoteCount}</AppIconButtonText>
        </AppIconButton>
      </AppButtonGroup>
    </li>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  upVoteCount: PropTypes.number.isRequired,
  downVoteCount: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
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

export function CommentList({ list, onUpVote, onDownVote }) {
  if (!list || list.length == 0) return <p>Komentar Kosong</p>;
  return (
    <ul className="comment-list">
      {list.map((comment) => (
        <CommentItem
          id={comment.id}
          key={comment.id}
          owner={comment.owner}
          content={comment.content}
          upVoteCount={comment.upVoteCount}
          isUpVoted={comment.isUpVoted}
          onUpVote={onUpVote}
          downVoteCount={comment.downVoteCount}
          isDownVoted={comment.isDownVoted}
          onDownVote={onDownVote}
        />
      ))}
    </ul>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
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

export function NewCommentForm({ value, onValueChanged, isLoading, onSubmit }) {
  return (
    <div className="new-comment">
      <ContentEditableInput
        value={value}
        onValueChanged={onValueChanged}
        placeholder="Masukkan Komentar"
      />
      <AppButtonGroup className="new-comment--button-group">
        <AppButtonGroupSpacer />
        <AppButton variant="primary" onClick={onSubmit} disabled={isLoading}>
          Kirim
        </AppButton>
      </AppButtonGroup>
    </div>
  );
}

NewCommentForm.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
