import React, { useState } from "react";
import { TopBar } from "../components/TopBar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUserState } from "../slices/auth";

export function MainLayout() {
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(selectUserState);

  return (
    <React.Fragment>
      <TopBar
        showSearch={showSearch}
        searchQuery={""}
        onSearchChange={() => {}}
        userName={user?.name}
        userAvatar={user?.avatar}
        onLogout={() => dispatch(logout())}
      />
      <Outlet
        context={{
          showSearch,
          setShowSearch,
        }}
      />
    </React.Fragment>
  );
}
