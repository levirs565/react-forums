import { NavLink } from 'react-router-dom';
import './TopBar.css';
import PropTypes from 'prop-types';
import React from 'react';
import MoreIcon from '../icons/MoreIcon';
import { AppButtonLink, AppIconButton } from './AppButton';
import {
  Popup,
  PopupContent,
  PopupItem,
  PopupItemIcon,
  PopupItemText,
} from './Popup';
import LogoutCircleIcon from '../icons/LogoutCircleIcon';
import MoonIcon from '../icons/MoonIcon';
import SunIcon from '../icons/SunIcon';
import { useI8n, useTheme } from '../provider/context';
import TranslateIcon from '../icons/TranslateIcon';

export function TopBarTabsItem({ to, children }) {
  return (
    <li className="top-bar-tabs--item">
      <NavLink
        className={({ isActive }) => [
          'top-bar-tabs--item-link',
          isActive ? 'top-bar-tabs--item-link--active' : '',
        ].join(' ')}
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}

TopBarTabsItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export function TopBarTabs({ children }) {
  return <ul className="top-bar-tabs">{children}</ul>;
}

TopBarTabs.propTypes = {
  children: PropTypes.node.isRequired,
};

export function TopBarPopupAccountContent({ userName, userAvatar, onLogout }) {
  const { getText } = useI8n();

  return (
    <PopupContent>
      {userName && (
        <>
          <PopupItem isHeader>
            <PopupItemIcon>
              <img alt="current user avatar" className="top-bar--avatar-header" src={userAvatar} />
            </PopupItemIcon>
            <PopupItemText>{userName}</PopupItemText>
          </PopupItem>
          <PopupItem clickable onClick={onLogout}>
            <PopupItemIcon>
              <LogoutCircleIcon />
            </PopupItemIcon>
            <PopupItemText>{getText('logout')}</PopupItemText>
          </PopupItem>
        </>
      )}
    </PopupContent>
  );
}

TopBarPopupAccountContent.propTypes = {
  userName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  userAvatar: PropTypes.string.isRequired,
};

export function TopBarPopupMoreContent() {
  const { theme, toggleTheme } = useTheme();
  const { getText, toggleLang } = useI8n();

  return (
    <PopupContent>
      <PopupItem clickable onClick={toggleTheme}>
        <PopupItemIcon>
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </PopupItemIcon>
        <PopupItemText>
          {getText(theme === 'dark' ? 'lightTheme' : 'darkTheme')}
        </PopupItemText>
      </PopupItem>
      <PopupItem clickable onClick={toggleLang}>
        <PopupItemIcon>
          <TranslateIcon />
        </PopupItemIcon>
        <PopupItemText>{getText('langName')}</PopupItemText>
      </PopupItem>
    </PopupContent>
  );
}

export function TopBar({
  userName,
  userAvatar,
  onLogout,
}) {
  const { getText } = useI8n();
  return (
    <header className="top-bar">
      <h1 className="top-bar--title">Forums</h1>
      <TopBarTabs>
        <TopBarTabsItem
          to="/"
        >
          {getText('threadList')}
        </TopBarTabsItem>
        <TopBarTabsItem
          to="/leaderboards"
        >
          {getText('leaderboard')}
        </TopBarTabsItem>
      </TopBarTabs>
      <div className="top-bar--grow" />
      {userName ? (
        <Popup>
          <AppIconButton>
            <img alt="current user avatar" className="top-bar--avatar-button" src={userAvatar} />
          </AppIconButton>
          <TopBarPopupAccountContent
            userName={userName}
            userAvatar={userAvatar}
            onLogout={onLogout}
          />
        </Popup>
      ) : (
        <AppButtonLink to="/login">{getText('loginAction')}</AppButtonLink>
      )}
      <Popup>
        <AppIconButton>
          <MoreIcon />
        </AppIconButton>
        <TopBarPopupMoreContent />
      </Popup>
    </header>
  );
}

TopBar.propTypes = {
  userName: PropTypes.string,
  userAvatar: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

TopBar.defaultProps = {
  userName: '',
  userAvatar: '',
};
