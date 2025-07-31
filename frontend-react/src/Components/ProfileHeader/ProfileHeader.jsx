import "./ProfileHeader.css";
import { Link } from "react-router-dom";
import BoldLogo from "../../assets/bold_logo.svg";
import Avatar from "../../assets/avatar.svg";

function ProfileHeader() {
  return (
    <div className="profile-header">
      <div className="profile-header__content">
        <h1 className="profile-header__title">MOON DREAMER</h1>
        <Link to="/home">
          <img
            className="profile-header__logo"
            src={BoldLogo}
            alt="Moon Dreamer Pink Logo"
          />
        </Link>
      </div>
      <div className="profile-header__container">
        <Link to="/profile">
          <img className="profile__avatar" src={Avatar} alt="" />
        </Link>
        <p className="profile-header__username">Username</p>
      </div>
    </div>
  );
}

export default ProfileHeader;
