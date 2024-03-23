import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLeaderboards, updateLeaderboard } from "../slices/leaderboard";
import { Leaderboard } from "../components/Leaderboard";
import { ErrorView } from "../components/ErrorView";

export function LeaderboardPage() {
  const dispatch = useDispatch();
  const { loading, list, error } = useSelector(selectLeaderboards);
  useEffect(() => {
    dispatch(updateLeaderboard());
  }, []);

  return (
    <div className="app-main app-main--content">
      <h1 className="subtitle">Leaderboard</h1>
      {error ? (
        <ErrorView
          error={error}
          onRefresh={() => dispatch(updateLeaderboard())}
        />
      ) : (
        <Leaderboard list={list} isLoading={loading} />
      )}
    </div>
  );
}
