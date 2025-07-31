import "./HomePage.css";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import HomeMain from "../HomeMain/HomeMain";
import NavBar from "../Navbar/NavBar";

function HomePage({ handleAddDreamClick, handleEditProfileClick }) {
  return (
    <div className="homepage__wrapper">
      <ProfileHeader />

      <HomeMain />

      <NavBar
        handleAddDreamClick={handleAddDreamClick}
        handleEditProfileClick={handleEditProfileClick}
      />
    </div>
  );
}
export default HomePage;
