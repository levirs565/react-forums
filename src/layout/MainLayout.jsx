import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TopBar } from '../components/TopBar';
import { logout, selectUserState } from '../slices/auth';

export default function MainLayout() {
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(selectUserState);

  return (
    <>
      <TopBar
        showSearch={showSearch}
        searchQuery=""
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
    </>
  );
}
