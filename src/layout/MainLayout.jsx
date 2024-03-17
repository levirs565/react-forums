import React, { useState } from "react";
import { TopBar } from "../components/TopBar";
import { Outlet } from "react-router-dom";

export function MainLayout() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <React.Fragment>
      <TopBar
        showSearch={showSearch}
        searchQuery={""}
        onSearchChange={() => {}}
        userName={""}
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
