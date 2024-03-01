import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFromApi } from "../slices/threads";
import { Link } from "react-router-dom";

export function ThreadListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFromApi());
  }, []);

  const threads = useSelector((state) => state.threads.value);

  return (
    <>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <h2>
              <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: thread.body,
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
