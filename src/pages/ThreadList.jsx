import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  downVoteThread,
  neutralizeVoteThread,
  selectCategoryList,
  selectThreadListCategoryFilter,
  selectThreadsList,
  setThreadListCategoryFilter,
  upVoteThread,
  updateThreads,
} from "../slices/threads";
import { ThreadCardList } from "../components/ThreadCard";
import { selectUserState } from "../slices/auth";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { ErrorView } from "../components/ErrorView";
import { updateUsers } from "../slices/users";
import {
  CategoryListShimmer,
  CategorySelectionList,
} from "../components/Category";
import { useI8n } from "../provider/context";

export function ThreadListPage() {
  const dispatch = useDispatch();
  const { user } = useSelector(selectUserState);

  useEffect(() => {
    dispatch(updateThreads());
    dispatch(updateUsers());
  }, []);

  const { loading, list, error } = useSelector(selectThreadsList);
  const categoryFilter = useSelector(selectThreadListCategoryFilter);
  const categoryList = useSelector(selectCategoryList);
  const { getText } = useI8n();

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
        <>
          <h2 className="subtitle">{getText("category")}</h2>
          {loading ? (
            <CategoryListShimmer count={3} />
          ) : (
            <CategorySelectionList
              list={categoryList}
              selected={categoryFilter}
              onSelected={(category) =>
                dispatch(setThreadListCategoryFilter(category))
              }
            />
          )}
          <h2 className="subtitle">{getText("availableThread")}</h2>
          <ThreadCardList
            emptyMessage={getText("threadListBlank")}
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
        </>
      )}
      {user && <FloatingActionButton to="/thread/new">+</FloatingActionButton>}
    </div>
  );
}
