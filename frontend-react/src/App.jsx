import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import MoonSignDisplay from "./MoonSignDisplay";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import RegisterModal from "./Components/RegisterModal/RegisterModal";
import LoginModal from "./Components/LoginModal/LoginModal";
import HomePage from "./Components/Homepage/Homepage";
import Profile from "./Components/Profile/Profile";
import AddDreamModal from "./Components/AddDreamModal/AddDreamModal";
import EditProfile from "./Components/EditProfileModal/EditProfile";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleAddDreamClick = () => {
    setActiveModal("add-dream");
  };

  return (
    <>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="app__container-landingpage">
                  <Header />
                  {/* <MoonSignDisplay /> */}
                  <Main
                    setActiveModal={setActiveModal}
                    handleLoginClick={handleLoginClick}
                    handleRegisterClick={handleRegisterClick}
                    closeActiveModal={closeActiveModal}
                  />
                  <Footer />
                  <RegisterModal
                    closeActiveModal={closeActiveModal}
                    activeModal={activeModal}
                    isOpen={activeModal === "register"}
                  />
                  <LoginModal
                    closeActiveModal={closeActiveModal}
                    activeModal={activeModal}
                    isOpen={activeModal === "login"}
                  />
                </div>
              </>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <>
                <HomePage
                  setActiveModal={setActiveModal}
                  handleAddDreamClick={handleAddDreamClick}
                  handleEditProfileClick={handleEditProfileClick}
                />
                <AddDreamModal
                  closeActiveModal={closeActiveModal}
                  activeModal={activeModal}
                  isOpen={activeModal === "add-dream"}
                />
                <EditProfile
                  closeActiveModal={closeActiveModal}
                  activeModal={activeModal}
                  isOpen={activeModal === "edit-profile"}
                />
              </>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <>
                <Profile
                  setActiveModal={setActiveModal}
                  handleAddDreamClick={handleAddDreamClick}
                  handleEditProfileClick={handleEditProfileClick}
                />
                <AddDreamModal
                  closeActiveModal={closeActiveModal}
                  activeModal={activeModal}
                  isOpen={activeModal === "add-dream"}
                />
                <EditProfile
                  closeActiveModal={closeActiveModal}
                  activeModal={activeModal}
                  isOpen={activeModal === "edit-profile"}
                />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
