import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { updateFromApi } from "./slices/threads";

function App() {
  const [count, setCount] = useState(0);
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
            <h2>{thread.title}</h2>
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

export default App;
