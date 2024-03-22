import { useMemo } from "react";
import { InnerShimmer, Shimmer } from "./Shimmer";
import "./Leaderboard.css";

function LeaderboardItem({ userName, userAvatar, score }) {
  return (
    <li className="leaderboard-item">
      <img className="leaderboard-item--avatar" src={userAvatar} />
      <p className="leaderboard-item--name">{userName}</p>
      <p className="leaderboard-item--score">{score}</p>
    </li>
  );
}

function LeaderboardItemShimmer() {
  return (
    <li className="leaderboard-item">
      <div className="leaderboard-item--avatar">
        <InnerShimmer />
      </div>
      <div className="leaderboard-item--name">
        <Shimmer>
          <span>User Name</span>
        </Shimmer>
      </div>

      <Shimmer>
        <p className="leaderboard-item--score">Score</p>
      </Shimmer>
    </li>
  );
}

export function Leaderboard({ list }) {
  const shimmerItems = useMemo(() => new Array(10).fill(0));
  return (
    <ul className="leaderboard-list">
      {list
        ? list.map(({ user, score }) => (
            <LeaderboardItem
              key={user.id}
              score={score}
              userName={user.name}
              userAvatar={user.avatar}
            />
          ))
        : shimmerItems.map((_, index) => (
            <LeaderboardItemShimmer key={index} />
          ))}
    </ul>
  );
}
