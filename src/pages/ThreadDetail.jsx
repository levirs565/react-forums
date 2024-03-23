import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addComment,
  downVoteComment,
  neutralizeVoteComment,
  selectAddCommentState,
  selectThreadDetail,
  upVoteComment,
  updateThreadDetail,
} from "../slices/threadDetail";
import {
  CommentList,
  CommentListShimmer,
  NewCommentForm,
} from "../components/Comment";
import { ThreadDetailShimmer, ThreadDetial } from "../components/ThreadDetail";
import { selectUserState } from "../slices/auth";
import {
  downVoteThread,
  neutralizeVoteThread,
  upVoteThread,
} from "../slices/threads";
import { ErrorView } from "../components/ErrorView";
import { useForm } from "react-hook-form";

export function ThreadDetailPage() {
  const param = useParams();
  const { user } = useSelector(selectUserState);
  const { loading, error, detail } = useSelector(selectThreadDetail);
  const { loading: addCommentLoading, error: addCommentError } = useSelector(
    selectAddCommentState
  );
  const newCommentForm = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!addCommentLoading && !addCommentError) {
      newCommentForm.reset();
    }
  }, [addCommentLoading, newCommentForm, addCommentError]);

  useEffect(() => {
    dispatch(updateThreadDetail({ id: param.id }));
  }, [param]);

  if (error)
    return (
      <div className="app-main app-main--content">
        <ErrorView
          error={error}
          onRefresh={() => dispatch(updateThreadDetail({ id: param.id }))}
        />
      </div>
    );

  return (
    <div className="app-main app-main--content">
      {loading ? (
        <ThreadDetailShimmer bodyLineCount={4} />
      ) : (
        <ThreadDetial
          title={detail.title}
          body={detail.body}
          createdAt={detail.createdAt}
          upVoteCount={detail.upVotesBy.length}
          isUpVoted={detail.upVotesBy.includes(user?.id)}
          downVoteCount={detail.downVotesBy.length}
          isDownVoted={detail.downVotesBy.includes(user?.id)}
          onUpVote={() => dispatch(upVoteThread({ id: param.id }))}
          onDownVote={() => dispatch(downVoteThread({ id: param.id }))}
          onNeutralizeVote={() =>
            dispatch(neutralizeVoteThread({ id: param.id }))
          }
          owner={detail.owner}
          category={detail.category}
        />
      )}

      {user && !loading && (
        <>
          <h2 className="subtitle">Komentar Baru</h2>
          <NewCommentForm
            form={newCommentForm}
            isLoading={addCommentLoading}
            onSubmit={({ content }) =>
              dispatch(addComment({ threadId: param.id, content }))
            }
            error={addCommentError}
          />
        </>
      )}

      <h2 className="subtitle">Komentar</h2>
      {loading ? (
        <CommentListShimmer />
      ) : (
        <CommentList
          list={detail.comments.map(
            ({ id, owner, content, upVotesBy, downVotesBy, createdAt }) => ({
              id,
              owner,
              content,
              createdAt,
              upVoteCount: upVotesBy.length,
              downVoteCount: downVotesBy.length,
              isUpVoted: upVotesBy.includes(user?.id),
              isDownVoted: downVotesBy.includes(user?.id),
            })
          )}
          onUpVote={(id) =>
            dispatch(upVoteComment({ threadId: param.id, commentId: id }))
          }
          onDownVote={(id) =>
            dispatch(downVoteComment({ threadId: param.id, commentId: id }))
          }
          onNeutralizeVote={(id) =>
            dispatch(
              neutralizeVoteComment({ threadId: param.id, commentId: id })
            )
          }
        />
      )}
    </div>
  );
}
