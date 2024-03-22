import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThreadListPage } from "./pages/ThreadList";
import { ThreadDetailPage } from "./pages/ThreadDetail";
import { RegisterPage } from "./pages/Register";
import { LoginPage } from "./pages/Login";
import { MainLayout } from "./layout/MainLayout";
import { useTheme } from "./provider/context";
import { LeaderboardPage } from "./pages/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ThreadListPage />,
      },
      {
        path: "/thread/:id",
        element: <ThreadDetailPage />,
      },

      {
        path: "/leaderboards",
        element: <LeaderboardPage />,
      },
    ],
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
  const { theme } = useTheme();
  return (
    <div className="app" data-theme={theme}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
