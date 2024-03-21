import React, { useState } from "react";
import { TopBar } from "../components/TopBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserState } from "../slices/auth";

export function MainLayout() {
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useSelector(selectUserState);

  return (
    <React.Fragment>
      <TopBar
        showSearch={showSearch}
        searchQuery={""}
        onSearchChange={() => {}}
        userName={user?.name}
        onLogout={() => {}}
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
