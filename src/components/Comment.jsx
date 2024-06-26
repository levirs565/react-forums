import PropTypes from 'prop-types';
import renderHtml from 'html-react-parser';
import './Comment.css';
import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import { MultiLineShimmer, Shimmer } from './Shimmer';
import { ContentEditableInput } from './ContentEditable';
import { AppButton, AppButtonGroup, AppButtonGroupSpacer } from './AppButton';
import { CardForm, CardFormContent, CardFormFooter } from './CardForm';
import {
  Field,
  FieldLabel,
  FieldMessage,
  ReactHookFieldMessage,
} from './Field';
import { UserInformation, UserInformationShimmer } from './UserInformation';
import { useFormatDate } from '../hook';
import { useI8n } from '../provider/context';
import VoteButtons from './Vote';

function CommentItem({
  id,
  owner,
  content,
  upVoteCount,
  downVoteCount,
  onUpVote,
  onDownVote,
  onNeutralizeVote,
  isUpVoted,
  isDownVoted,
  createdAt,
}) {
  const formatDate = useFormatDate();
  return (
    <li className="comment">
      <div className="comment--header">
        <UserInformation name={owner.name} avatar={owner.avatar} />
        <div className="dot-divider" />
        <time className="comment--date">{formatDate(createdAt)}</time>
      </div>
      <div className="comment--body">{renderHtml(content)}</div>
      <AppButtonGroup className="comment--footer">
        <VoteButtons
          upVoteCount={upVoteCount}
          downVoteCount={downVoteCount}
          isUpVoted={isUpVoted}
          isDownVoted={isDownVoted}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
          onNeutralizeVote={() => onNeutralizeVote(id)}
        />
        <AppButtonGroupSpacer />
      </AppButtonGroup>
    </li>
  );
}

const CommentItemPropTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  content: PropTypes.string.isRequired,
  upVoteCount: PropTypes.number.isRequired,
  downVoteCount: PropTypes.number.isRequired,
  isUpVoted: PropTypes.bool.isRequired,
  isDownVoted: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
  ...CommentItemPropTypes,
};

function CommentItemShimmer({ contentLineCount }) {
  return (
    <li className="comment">
      <div className="comment--header">
        <UserInformationShimmer />
        <Shimmer>
          <time className="comment--date">Date</time>
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

export function CommentList({
  list, onUpVote, onDownVote, onNeutralizeVote,
}) {
  const { getText } = useI8n();
  if (!list || list.length === 0) return <p>{getText('commentListBlank')}</p>;
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
          onNeutralizeVote={onNeutralizeVote}
          createdAt={comment.createdAt}
        />
      ))}
    </ul>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape(CommentItemPropTypes)).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
};

export function CommentListShimmer() {
  const lineCount = useMemo(
    () => [1, 1, 2, 2, 3, 3].sort(() => 0.5 - Math.random()),
    [],
  );

  return (
    <ul className="comment-list">
      {lineCount.map((value, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <CommentItemShimmer key={index} contentLineCount={value} />
      ))}
    </ul>
  );
}

export function NewCommentForm({
  form, isLoading, onSubmit, error,
}) {
  const { getText } = useI8n();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = form;
  return (
    <CardForm isFluid onSubmit={handleSubmit(onSubmit)} isSurface>
      <CardFormContent>
        <Field inputId="content">
          <FieldLabel onClick={() => setFocus('content')}>
            {getText('commentField')}
          </FieldLabel>
          <Controller
            control={control}
            name="content"
            rules={{
              required: {
                value: true,
                message: getText('commentCannotBlank'),
              },
            }}
            render={({ field }) => (
              <ContentEditableInput
                editable
                value={field.value ?? ''}
                onValueChanged={(value) => {
                  field.onChange(value);
                  field.onBlur();
                }}
                ref={field.ref}
              />
            )}
          />

          <ReactHookFieldMessage error={errors.content} />
        </Field>
        <Field inputId="">
          {error && <FieldMessage error>{error}</FieldMessage>}
        </Field>
      </CardFormContent>
      <CardFormFooter>
        <AppButtonGroup>
          <AppButtonGroupSpacer />
          <AppButton isSubmit variant="primary" disabled={isLoading}>
            {getText('createCommentAction')}
          </AppButton>
        </AppButtonGroup>
      </CardFormFooter>
    </CardForm>
  );
}

NewCommentForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

NewCommentForm.defaultProps = {
  error: '',
};
