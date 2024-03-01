import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFromApi } from "../slices/threads";
import { Link } from "react-router-dom";
import "./ThreadList.css";

export function ThreadListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFromApi());
  }, []);

  const threads = useSelector((state) => state.threads.value);

  return (
    <>
      <ul className="thread-list">
        {threads.map((thread) => (
          <li className="thread-list-item" key={thread.id}>
            <h2 className="thread-list-item--title">
              <Link
                className="thread-list-item--link"
                to={`/thread/${thread.id}`}
              >
                {thread.title}
              </Link>
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: thread.body,
              }}
              className="thread-list-item--body"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
