import { NavLink } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import "./TopBar.css";
import PropTypes from "prop-types";
import { MoreIcon } from "../icons/MoreIcon";
import { AppIconButton } from "./AppButton";
import {
  Popup,
  PopupContent,
  PopupItem,
  PopupItemIcon,
  PopupItemText,
} from "./Popup";
import { AccountCircleIcon } from "../icons/AccountCircleIcon";
import { LogoutCircleIcon } from "../icons/LogoutCircleIcon";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";
import React from "react";
import { useI8n, useTheme } from "../provider/context";
import { TranslateIcon } from "../icons/TranslateIcon";

export function TopBarTabsItem({ to, children }) {
  return (
    <li className="top-bar-tabs--item">
      <NavLink
        className={({ isActive }) =>
          [
            "top-bar-tabs--item-link",
            isActive ? "top-bar-tabs--item-link--active" : "",
          ].join(" ")
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}

TopBarTabsItem.propTypes = {
  to: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export function TopBarTabs({ children }) {
  return <ul className="top-bar-tabs">{children}</ul>;
}

TopBarTabs.propTypes = {
  children: PropTypes.node,
};

export function TopBarPopupContent({ userName, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const { getText, toggleLang } = useI8n();

  return (
    <PopupContent>
      {userName && (
        <React.Fragment>
          <PopupItem>
            <PopupItemIcon>
              <AccountCircleIcon />
            </PopupItemIcon>
            <PopupItemText>{userName}</PopupItemText>
          </PopupItem>
          <PopupItem clickable onClick={onLogout}>
            <PopupItemIcon>
              <LogoutCircleIcon />
            </PopupItemIcon>
            <PopupItemText>{getText("logout")}</PopupItemText>
          </PopupItem>
        </React.Fragment>
      )}
      <PopupItem clickable onClick={toggleTheme}>
        <PopupItemIcon>
          {theme === "dark" ? <MoonIcon /> : <SunIcon />}
        </PopupItemIcon>
        <PopupItemText>
          {getText(theme === "dark" ? "lightTheme" : "darkTheme")}
        </PopupItemText>
      </PopupItem>
      <PopupItem clickable onClick={toggleLang}>
        <PopupItemIcon>
          <TranslateIcon />
        </PopupItemIcon>
        <PopupItemText>{getText("langName")}</PopupItemText>
      </PopupItem>
    </PopupContent>
  );
}

TopBarPopupContent.propTypes = {
  userName: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export function TopBar({
  showSearch,
  searchQuery,
  onSearchChange,
  userName,
  onLogout,
}) {
  const { getText } = useI8n();
  const searchParam = null;
  return (
    <header className="top-bar">
      <h1 className="top-bar--title">Forums</h1>
      {userName && (
        <TopBarTabs>
          <TopBarTabsItem
            to={{
              pathname: "/",
              search: searchParam,
            }}
          >
            {getText("activeNote")}
          </TopBarTabsItem>
          <TopBarTabsItem
            to={{
              pathname: "/archive",
              search: searchParam,
            }}
          >
            {getText("archiveNote")}
          </TopBarTabsItem>
        </TopBarTabs>
      )}
      <div className="top-bar--grow" />
      {showSearch && (
        <SearchInput
          value={searchQuery}
          onChange={(el) => onSearchChange(el.target.value)}
        />
      )}
      <Popup>
        <AppIconButton>
          <MoreIcon />
        </AppIconButton>
        <TopBarPopupContent userName={userName} onLogout={onLogout} />
      </Popup>
    </header>
  );
}

TopBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  showSearch: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};