import "./Profile.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import NavBar from "../Navbar/NavBar";
import ProfileMain from "../ProfileMain/ProfileMain";

function Profile({
  handleAddDreamClick,
  handleEditProfileClick,
  handleDeleteDreamClick,
  handleEditDreamClick,
  dreams,
}) {
  return (
    <div className="profile">
      <ProfileHeader />
      <ProfileMain
        dreams={dreams}
        handleDeleteDreamClick={handleDeleteDreamClick}
        handleEditDreamClick={handleEditDreamClick}
      />
      <NavBar
        handleAddDreamClick={handleAddDreamClick}
        handleEditProfileClick={handleEditProfileClick}
      />
    </div>
  );
}

export default Profile;
