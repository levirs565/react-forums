import React from 'react';
import PropTypes from 'prop-types';
import './UserInformation.css';
import { InnerShimmer, Shimmer } from './Shimmer';

export function UserInformation({ className, avatar, name }) {
  return (
    <div className={['user-info', className].join(' ')}>
      <img alt={`${name} avatar`} className="user-info--avatar" src={avatar} />
      <p className="user-info--name">{name}</p>
    </div>
  );
}

UserInformation.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

UserInformation.defaultProps = {
  className: '',
};

export function UserInformationShimmer({ className }) {
  return (
    <div className={['user-info', className].join(' ')}>
      <div className="user-info--avatar">
        <InnerShimmer />
      </div>
      <Shimmer>
        <p className="user-info--name">Name</p>
      </Shimmer>
    </div>
  );
}

UserInformationShimmer.propTypes = {
  className: PropTypes.string,
};

UserInformationShimmer.defaultProps = {
  className: '',
};
