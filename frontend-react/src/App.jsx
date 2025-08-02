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
import DeleteDreamModal from "./Components/DeleteDreamModal/DeleteDreamModal";
import { initialDreams } from "./utils/constants";
import { loadDreamsFromLocalStorage, saveDreamToLocalStorage } from "./utils/localDreamStorage";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [dreams, setDreams] = useState(initialDreams);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAddDream = (newDream) => {
    saveDreamToLocalStorage(newDream);
    setDreams((prevDreams) => [newDream, ...prevDreams]);
  };

  // Click Handlers
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

  const handleDeleteDreamClick = () => {
    setActiveModal("delete-dream");
  };

  const handleEditDreamClick = () => {
    setActiveModal("add-dream");
  };

  // // functions
  // const handleFilter = (sign) => {
  //     console.log("Filtering dreams by:", sign);

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
                {/* <AddDreamModal
                  closeActiveModal={closeActiveModal}
                  activeModal={activeModal}
                  isOpen={activeModal === "add-dream"}
                /> */}
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
                  handleDeleteDreamClick={handleDeleteDreamClick}
                  handleEditDreamClick={handleEditDreamClick}
                  dreams={dreams}
                  setDreams={setDreams}
                />
                <AddDreamModal
                  closeActiveModal={closeActiveModal}
                  activeModal={activeModal}
                  isOpen={activeModal === "add-dream"}
                  onAddDream={handleAddDream}
                />
                <EditProfile
                  closeActiveModal={closeActiveModal}
                  activeModal={activeModal}
                  isOpen={activeModal === "edit-profile"}
                />
                <DeleteDreamModal
                  closeActiveModal={closeActiveModal}
                  activeModal={activeModal}
                  isOpen={activeModal === "delete-dream"}
                ></DeleteDreamModal>
              </>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
