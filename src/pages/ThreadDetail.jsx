import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectThreadDetail, updateThreadDetail } from "../slices/threadDetail";
import htmlToReact from "html-react-parser";
import "./ThreadDetail.css";
import { useFormatDate } from "../hook";
import { MultiLineShimmer, Shimmer } from "../components/Shimmer";
import { CommentList, CommentListShimmer } from "../components/Comment";

export function ThreadDetailPage() {
  const param = useParams();
  const { loading, error, detail } = useSelector(selectThreadDetail);
  const dispatch = useDispatch();
  const formatDate = useFormatDate();

  useEffect(() => {
    dispatch(updateThreadDetail({ id: param.id }));
  }, [param]);

  if (loading)
    return (
      <div className="app-main app-main--content">
        <Shimmer>
          <h1>Title</h1>
        </Shimmer>
        <Shimmer>
          <time>Date</time>
        </Shimmer>
        <MultiLineShimmer
          lineCount={4}
          renderItem={(index) => (
            <Shimmer key={index}>
              <p>Body</p>
            </Shimmer>
          )}
        />

        <Shimmer>
          <h2>Komentar</h2>
        </Shimmer>
        <CommentListShimmer />
      </div>
    );

  return (
    <div className="app-main app-main--content">
      <h1>{detail.title}</h1>
      <time>{formatDate(detail.createdAt)}</time>
      <div>{htmlToReact(detail.body)}</div>

      <h2>Komentar</h2>
      <CommentList list={detail.comments} />
    </div>
  );
}
