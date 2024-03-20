import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectThreadsList as selectThreadsList,
  updateThreads,
} from "../slices/threads";
import { ThreadCardList } from "../components/ThreadCard";

export function ThreadListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateThreads());
  }, []);

  const { loading, list } = useSelector(selectThreadsList);

  return (
    <div className="app-main">
      <ThreadCardList
        emptyMessage="Kosong"
        highlightPattern=""
        isLoading={loading}
        list={list}
      />
    </div>
  );
}
