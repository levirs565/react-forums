import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downVoteThread,
  neutralizeVoteThread,
  selectThreadsList,
  upVoteThread,
  updateThreads,
} from "../slices/threads";
import { ThreadCardList } from "../components/ThreadCard";
import { selectUserState } from "../slices/auth";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { ErrorView } from "../components/ErrorView";
import { updateUsers } from "../slices/users";

export function ThreadListPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUserState);

  useEffect(() => {
    dispatch(updateThreads());
    dispatch(updateUsers());
  }, []);

  const { loading, list, error } = useSelector(selectThreadsList);

  return (
    <div className="app-main app-main--content">
      {error ? (
        <ErrorView
          error={error}
          onRefresh={() => {
            dispatch(updateThreads());
            dispatch(updateUsers());
          }}
        />
      ) : (
        <ThreadCardList
          emptyMessage="Kosong"
          highlightPattern=""
          isLoading={loading}
          list={list?.map(
            ({
              id,
              title,
              body,
              createdAt,
              upVotesBy,
              downVotesBy,
              owner,
              category,
            }) => ({
              id,
              title,
              body,
              createdAt,
              owner,
              upVoteCount: upVotesBy.length,
              downVoteCount: downVotesBy.length,
              isUpVoted: upVotesBy.includes(user?.id),
              isDownVoted: downVotesBy.includes(user?.id),
              category,
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
