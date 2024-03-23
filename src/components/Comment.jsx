import PropTypes from "prop-types";
import renderHtml from "html-react-parser";
import "./Comment.css";
import { InnerShimmer, MultiLineShimmer, Shimmer } from "./Shimmer";
import { useMemo } from "react";
import { ContentEditableInput } from "./ContentEditable";
import { AppButton, AppButtonGroup, AppButtonGroupSpacer } from "./AppButton";
import { VoteButtonGroup } from "./Vote";
import { CardForm, CardFormContent, CardFormFooter } from "./CardForm";
import {
  Field,
  FieldLabel,
  FieldMessage,
  ReactHookFieldMessage,
} from "./Field";
import { Controller } from "react-hook-form";
import { UserInformation } from "./UserInformation";
import { useFormatDate } from "../hook";

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
        <div className="dot-divider"></div>
        <time className="comment--date">{formatDate(createdAt)}</time>
      </div>
      <div className="comment--body">{renderHtml(content)}</div>
      <VoteButtonGroup
        className="comment--footer"
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
  onNeutralizeVote: PropTypes.func.isRequired,
  createdAt: PropTypes.string.isRequired,
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

export function CommentList({ list, onUpVote, onDownVote, onNeutralizeVote }) {
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
          onNeutralizeVote={onNeutralizeVote}
          createdAt={comment.createdAt}
        />
      ))}
    </ul>
  );
}

CommentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onNeutralizeVote: PropTypes.func.isRequired,
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

export function NewCommentForm({ form, isLoading, onSubmit, error }) {
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
          <FieldLabel onClick={() => setFocus("content")}>Komentar</FieldLabel>
          <Controller
            control={control}
            name="content"
            rules={{
              required: {
                value: true,
                message: "Konten tidak boleh kosong",
              },
            }}
            render={({ field }) => (
              <ContentEditableInput
                value={field.value ?? ""}
                onValueChanged={(value) => {
                  field.onChange(value);
                  field.onBlur();
                }}
                ref={field.ref}
                placeholder=""
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
          <AppButton variant="primary" disabled={isLoading}>
            Buat Komentar
          </AppButton>
        </AppButtonGroup>
      </CardFormFooter>
    </CardForm>
  );
}

NewCommentForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
