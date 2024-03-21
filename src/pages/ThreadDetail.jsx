import { useEffect, useState } from "react";
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

export function ThreadDetailPage() {
  const param = useParams();
  const { user } = useSelector(selectUserState);
  const { loading, error, detail } = useSelector(selectThreadDetail);
  const { loading: addCommentLoading, error: addCommentError } = useSelector(
    selectAddCommentState
  );
  const [newComment, setNewComment] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!addCommentLoading) {
      setNewComment("");
    }
  }, [addCommentLoading]);

  useEffect(() => {
    dispatch(updateThreadDetail({ id: param.id }));
  }, [param]);

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
        />
      )}

      {user && !loading && (
        <>
          <h2 className="subtitle">Komentar Baru</h2>
          <NewCommentForm
            value={newComment}
            onValueChanged={(value) => setNewComment(value)}
            isLoading={addCommentLoading}
            onSubmit={() =>
              dispatch(addComment({ threadId: param.id, content: newComment }))
            }
          />
        </>
      )}

      <h2 className="subtitle">Komentar</h2>
      {loading ? (
        <CommentListShimmer />
      ) : (
        <CommentList
          list={detail.comments.map(
            ({ id, owner, content, upVotesBy, downVotesBy }) => ({
              id,
              owner,
              content,
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
