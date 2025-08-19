import { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useModal } from "../../contexts/modalContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal.jsx";
import Home from "../Home/Home.jsx";
import Profile from "../Profile/Profile.jsx";
import DreamModal from "../DreamModal/DreamModal.jsx";
import EditProfile from "../EditProfileModal/EditProfile.jsx";
import SignOutModal from "../SignOutModal/SignOutModal.jsx";
import DeleteDreamModal from "../DeleteDreamModal/DeleteDreamModal.jsx";
import {
  loadDreamsForUser,
  saveDreamForUser,
  deleteDreamForUser,
  updateDreamForUser,
} from "../../utils/localDreamStorage";
import { mockSignIn } from "../../utils/mockAuth.js";
import { MoonProvider } from "../../contexts/moonSignContext.jsx";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute.jsx";
import { DreamContext } from "../../contexts/dreamContext.jsx";
import { UserContext } from "../../contexts/userContext.jsx";

function App() {
  const {
    dreams,
    setDreams,
    setDreamToDelete,
    dreamToDelete,
    setSelectedDream,
    updateDream,
  } = useContext(DreamContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { activeModal, openModal, closeModal } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dreamBeingEdited, setDreamBeingEdited] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!currentUser?.username);
  }, [currentUser]);

  //sync dreams when the user changes
  useEffect(() => {
    if (currentUser?.username) {
      const userDreams = loadDreamsForUser(currentUser.username);
      setDreams(userDreams);
    } else {
      setDreams([]);
    }
  }, [currentUser]);

  // save currenUSer to local storage on changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const handleAddDream = (newDream) => {
    saveDreamForUser(currentUser.username, newDream);
    setDreams((prevDreams) => [newDream, ...prevDreams]);
  };

  function handleEditDream(updatedDreamData) {
    if (!currentUser) return;
    const updatedDream = updateDreamForUser(
      currentUser.username,
      updatedDreamData
    );
    updateDream(updatedDream);
    closeModal();
    setDreamBeingEdited(null);
  }

  const handleDeleteDream = () => {
    if (!dreamToDelete || !currentUser?.username) return;
    console.log("Deleting dream ID:", dreamToDelete.id);
    console.log("Deleting dream for:", currentUser.username);

    const updatedDreams = deleteDreamForUser(
      currentUser.username,
      dreamToDelete.id
    );
    setDreams(updatedDreams);
    closeModal(activeModal);
    setSelectedDream(null);
    setDreamToDelete(null);
    navigate("/profile");
  };

  function handleSignIn(credentials) {
    try {
      const user = mockSignIn(credentials);
      setCurrentUser(user);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (e) {
      alert(e.message);
    }
  }

  function handleSignOut(e) {
    e.preventDefault();
    setIsLoggedIn(false);
    closeModal();
    navigate("/");
  }

  function handleRegister(user) {
    setCurrentUser(user);
    setIsLoggedIn(true);
    navigate("/home");
    closeModal();
  }

  function handleProfileUpdate(updatedFields) {
    const updatedUser = {
      ...currentUser,
      ...updatedFields,
    };

    const users = JSON.parse(localStorage.getItem("mockUsers")) || [];
    const updatedUsers = users.map((u) =>
      u.username === updatedUser.username ? updatedUser : u
    );

    localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setCurrentUser(updatedUser);
    openModal(null);
  }

  // Click Handlers
  const handleRegisterClick = () => {
    openModal("register");
  };

  const handleLoginClick = () => {
    openModal("login");
  };

  const handleEditProfileClick = () => {
    openModal("edit-profile");
  };

  const handleDreamClick = () => {
    openModal("add-dream");
  };

  const handleDeleteDreamClick = (dream) => {
    console.log("Setting dreamToDelete:", dream);
    setDreamToDelete(dream);
    openModal("delete-dream");
  };

  const handleEditDreamClick = (dream) => {
    setDreamBeingEdited(dream);
    openModal("edit-dream");
  };

  const handleSignOutClick = () => {
    openModal("sign-out");
  };

  return (
    <>
      <div className="app">
        <MoonProvider>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="app__container-landingpage">
                    <Header />
                    {/* <MoonSignDisplay /> */}
                    <Main
                      handleLoginClick={handleLoginClick}
                      handleRegisterClick={handleRegisterClick}
                      closeActiveModal={closeModal}
                    />
                    <Footer />
                  </div>
                </>
              }
            ></Route>
            <Route
              path="/home"
              element={
                <>
                  <ProtectedRoute>
                    <Home
                      handleSignOutClick={handleSignOutClick}
                      handleDreamClick={handleDreamClick}
                      handleEditProfileClick={handleEditProfileClick}
                    />
                  </ProtectedRoute>
                </>
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <>
                  <ProtectedRoute>
                    <Profile
                      dreams={dreams}
                      setDreams={setDreams}
                      handleDreamClick={handleDreamClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOutClick={handleSignOutClick}
                      handleDeleteDreamClick={handleDeleteDreamClick}
                      handleEditDreamClick={handleEditDreamClick}
                    />
                  </ProtectedRoute>
                </>
              }
            ></Route>
          </Routes>
        </MoonProvider>
        <EditProfile
          closeActiveModal={closeModal}
          isOpen={activeModal === "edit-profile"}
          currentUser={currentUser}
          onCompleteProfile={handleProfileUpdate}
        />
        <DeleteDreamModal
          onConfirm={handleDeleteDream}
          closeActiveModal={closeModal}
          isOpen={activeModal === "delete-dream"}
        />
        <DreamModal
          isOpen={activeModal === "add-dream" || activeModal === "edit-dream"}
          closeActiveModal={closeModal}
          onSubmitDream={
            activeModal === "add-dream" ? handleAddDream : handleEditDream
          }
          dreamToEdit={activeModal === "edit-dream" ? dreamBeingEdited : null}
        />
        <LoginModal
          onSignIn={handleSignIn}
          closeActiveModal={closeModal}
          isOpen={activeModal === "login"}
        />{" "}
        <RegisterModal
          onRegister={handleRegister}
          closeActiveModal={closeModal}
          isOpen={activeModal === "register"}
        />
        <SignOutModal
          onConfirm={handleSignOut}
          isOpen={activeModal === "sign-out"}
          closeActiveModal={closeModal}
        />
      </div>
    </>
  );
}

export default App;
