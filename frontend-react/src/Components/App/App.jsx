import { useState, useEffect, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useModal } from "../../contexts/modalContext";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import HomePage from "../Homepage/Homepage";
import Profile from "../Profile/Profile";
import DreamModal from "../DreamModal/DreamModal";
import EditProfile from "../EditProfileModal/EditProfile";
import SignOutModal from "../SignOutModal/SignOutModal";
import DeleteDreamModal from "../DeleteDreamModal/DeleteDreamModal";
import {
  loadDreamsForUser,
  saveDreamForUser,
  deleteDreamForUser,
} from "../../utils/localDreamStorage";
import { mockRegister, mockSignIn } from "../../utils/mockAuth";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { DreamContext } from "../../contexts/dreamContext";
import { UserContext } from "../../contexts/userContext";

function App() {
  const {
    dreams,
    setDreams,
    setDreamToDelete,
    dreamToDelete,
    setSelectedDream,
  } = useContext(DreamContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { activeModal, openModal, closeModal } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dreamBeingEdited, setDreamBeingEdited] = useState(null);
  const navigate = useNavigate();

  // load user on first mount
  // useEffect(() => {
  //   const savedUser = JSON.parse(localStorage.getItem("currentUser"));
  //   if (savedUser?.username) {
  //     setCurrentUser(savedUser);
  //   }
  //   setLoadingUser(false);
  // }, [setCurrentUser]);
  // if (loadingUser) {
  //   return null;
  // }

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

  function handleEditDream(updatedDream) {
    setDreams((prev) =>
      prev.map((dream) => (dream.id === updatedDream.id ? updatedDream : dream))
    );
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

  function handleRegister(credentials) {
    try {
      const newUser = mockRegister(credentials);
      setCurrentUser(newUser);
      setIsLoggedIn(true);
      navigate("/home");
      closeModal();
    } catch (e) {
      alert(e.message);
    }
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
                  <HomePage
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
