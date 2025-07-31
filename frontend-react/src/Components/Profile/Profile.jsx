import "./Profile.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import NavBar from "../Navbar/NavBar"
import ProfileMain from "../ProfileMain/ProfileMain";

function Profile({handleAddDreamClick, handleEditProfileClick}) {
  return (
    <div className="profile">
      <ProfileHeader />
      <ProfileMain />
      <NavBar
      handleAddDreamClick={handleAddDreamClick} 
      handleEditProfileClick={handleEditProfileClick}/>
    </div>
  );
}

export default Profile;
