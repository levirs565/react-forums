import './ThreadCard.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import htmlToReact from 'html-react-parser';
import { MultiLineShimmer, Shimmer } from './Shimmer';
import { useFormatDate } from '../hook';
import VoteButtons from './Vote';
import { UserInformation, UserInformationShimmer } from './UserInformation';
import { Category } from './Category';
import { AppButtonGroup, AppButtonGroupSpacer } from './AppButton';
import { IconLabel, IconLabelText } from './IconLabel';
import ChatIcon from '../icons/ChatIcon';

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
  owner,
  category,
  totalComments,
}) {
  const location = useLocation();
  const formatDate = useFormatDate();
  return (
    <li className="thread-card">
      <div className="thread-card--header">
        <UserInformation avatar={owner.avatar} name={owner.name} />
        <div className="dot-divider" />
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
          {htmlToReact(title)}
        </Link>
      </h3>
      <div className="thread-card--category">
        <Category as="span" text={category} />
      </div>
      <div className="thread-card--body">
        {htmlToReact(body)}
      </div>
      <AppButtonGroup className="thread-card--footer">
        <VoteButtons
          upVoteCount={upVoteCount}
          downVoteCount={downVoteCount}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
          onNeutralizeVote={() => onNeutralizeVote(id)}
        />
        <IconLabel>
          <ChatIcon />
          <IconLabelText>{totalComments}</IconLabelText>
        </IconLabel>
        <AppButtonGroupSpacer />
      </AppButtonGroup>
    </li>
  );
}

const ThreadItemPropTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVoteCount: PropTypes.number.isRequired,
  downVoteCount: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
};

ThreadCard.propTypes = {
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
  ...ThreadItemPropTypes,
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
  () => 0.5 - Math.random(),
);

export function ThreadCardList({
  list,
  isLoading,
  emptyMessage,
  onDownVote,
  onUpVote,
  onNeutralizeVote,
}) {
  if (isLoading) {
    return (
      <ul className="thread-card-list">
        {noteListShimmerBodyLineCount.map((value, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ThreadCardShimmer key={index} bodyLineCount={value} />
        ))}
      </ul>
    );
  }

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
          totalComments,
        }) => (
          <ThreadCard
            key={id}
            id={id}
            title={title}
            body={body}
            createdAt={createdAt}
            owner={owner}
            category={category}
            upVoteCount={upVoteCount}
            downVoteCount={downVoteCount}
            isUpVoted={isUpVoted}
            isDownVoted={isDownVoted}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            onNeutralizeVote={onNeutralizeVote}
            totalComments={totalComments}
          />
        ),
      )}
    </ul>
  );
}

ThreadCardList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(ThreadItemPropTypes)),
  emptyMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

ThreadCardList.defaultProps = {
  list: null,
};
