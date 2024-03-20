import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectThreadDetail, updateThreadDetail } from "../slices/threadDetail";
import { CommentList, CommentListShimmer } from "../components/Comment";
import { ThreadDetailShimmer, ThreadDetial } from "../components/ThreadDetail";

export function ThreadDetailPage() {
  const param = useParams();
  const { loading, error, detail } = useSelector(selectThreadDetail);
  const dispatch = useDispatch();

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

      <h2 className="subtitle">Komentar</h2>
      {loading ? (
        <CommentListShimmer />
      ) : (
        <CommentList list={detail.comments} />
      )}
    </div>
  );
}
