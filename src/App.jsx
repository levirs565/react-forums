import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThreadListPage } from "./pages/ThreadList";
import { ThreadDetailPage } from "./pages/ThreadDetail";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ThreadListPage />,
  },
  {
    path: "/thread/:id",
    element: <ThreadDetailPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
