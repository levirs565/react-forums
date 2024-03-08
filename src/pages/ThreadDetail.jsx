import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateFromApi } from "../slices/threadDetail";
import "./ThreadDetail.css";

export function ThreadDetailPage() {
  const param = useParams();
  const detail = useSelector((state) => state.threadDetail.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Update");
    dispatch(updateFromApi(param.id));
  }, [param]);

  return (
    <div className="app-main">
      <h1>{detail.title}</h1>
      <p
        dangerouslySetInnerHTML={{
          __html: detail.body,
        }}
      ></p>

      <h2>Komentar</h2>
      <ul className="comment-list">
        {(detail.comments ?? []).map((comment) => (
          <li key={comment.id} className="comment">
            <div className="comment--header">
              <img className="comment--avatar" src={comment.owner.avatar} />
              <p className="comment--owner">{comment.owner.name}</p>
            </div>
            <p
              className="comment--body"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            ></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
