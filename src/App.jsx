import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThreadListPage } from "./pages/ThreadList";
import { ThreadDetailPage } from "./pages/ThreadDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ThreadListPage />,
  },
  {
    path: "/thread/:id",
    element: <ThreadDetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
