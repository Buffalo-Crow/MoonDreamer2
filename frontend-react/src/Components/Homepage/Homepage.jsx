import "./HomePage.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import HomeMain from "../HomeMain/HomeMain";
import NavBar from "../Navbar/NavBar";

function HomePage({
  handleDreamClick,
  handleEditProfileClick,
  handleSignOutClick,
}) {
  return (
    <div className="homepage__wrapper">
      <ProfileHeader handleEditProfileClick={handleEditProfileClick} />

      <HomeMain />

      <NavBar
        handleDreamClick={handleDreamClick}
        handleSignOutClick={handleSignOutClick}
      />
    </div>
  );
}
export default HomePage;
