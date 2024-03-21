import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addComment,
  downVoteComment,
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
        />
      )}

      {user && (
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
        />
      )}
    </div>
  );
}
