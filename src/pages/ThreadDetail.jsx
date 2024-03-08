import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateFromApi } from "../slices/threadDetail";

export function ThreadDetailPage() {
  const param = useParams();
  const detail = useSelector((state) => state.threadDetail.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Update");
    dispatch(updateFromApi(param.id));
  }, [param]);

  return (
    <div>
      <h1>{detail.title}</h1>
      <p>{detail.body}</p>

      <h2>Komentar</h2>
      <ul>
        {(detail.comments ?? []).map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}
