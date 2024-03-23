import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downVoteThread,
  neutralizeVoteThread,
  selectThreadsList as selectThreadsList,
  upVoteThread,
  updateThreads,
} from "../slices/threads";
import { ThreadCardList } from "../components/ThreadCard";
import { selectUserState } from "../slices/auth";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { ErrorView } from "../components/ErrorView";

export function ThreadListPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUserState);

  useEffect(() => {
    dispatch(updateThreads());
  }, []);

  const { loading, list, error } = useSelector(selectThreadsList);

  return (
    <div className="app-main app-main--content">
      {error ? (
        <ErrorView error={error} onRefresh={() => dispatch(updateThreads())} />
      ) : (
        <ThreadCardList
          emptyMessage="Kosong"
          highlightPattern=""
          isLoading={loading}
          list={list?.map(
            ({ id, title, body, createdAt, upVotesBy, downVotesBy }) => ({
              id,
              title,
              body,
              createdAt,
              upVoteCount: upVotesBy.length,
              downVoteCount: downVotesBy.length,
              isUpVoted: upVotesBy.includes(user?.id),
              isDownVoted: downVotesBy.includes(user?.id),
            })
          )}
          onUpVote={(id) => dispatch(upVoteThread({ id }))}
          onDownVote={(id) => dispatch(downVoteThread({ id }))}
          onNeutralizeVote={(id) => dispatch(neutralizeVoteThread({ id }))}
        />
      )}
      {user && <FloatingActionButton to="/thread/new">+</FloatingActionButton>}
    </div>
  );
}
