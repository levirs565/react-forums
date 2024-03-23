import PropTypes from "prop-types";
import "./UserInformation.css";

export function UserInformation({ className, avatar, name }) {
  return (
    <div className={["user-info", className].join(" ")}>
      <img className="user-info--avatar" src={avatar} />
      <p className="user-info--name">{name}</p>
    </div>
  );
}

UserInformation.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
