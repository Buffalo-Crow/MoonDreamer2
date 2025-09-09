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
import { signin, signOut, register, getUserInfo} from "../../utils/auth.js";
import { MoonProvider } from "../../contexts/moonSignContext.jsx";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute.jsx";
import { DreamContext } from "../../contexts/dreamContext.jsx";
import { UserContext } from "../../contexts/userContext.jsx";
import { editProfile } from "../../utils/api.js";

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
  const [dreamBeingEdited, setDreamBeingEdited] = useState(null);
  const navigate = useNavigate();

 
useEffect(() => {
  const storedUser = localStorage.getItem("currentUser");
  const token = localStorage.getItem("jwtToken");
  if (!token) return;

  let parsedUser = null;
  if (storedUser) {
    try {
      parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser); // immediate restore
    } catch (err) {
      console.warn("Failed to parse stored user:", err);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("jwtToken");
    }
  }
  getUserInfo()
    .then((user) => setCurrentUser(user))
    .catch((err) => {
      console.error("Failed to restore user:", err);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("jwtToken");
      setCurrentUser(null);
    });
}, [setCurrentUser]);

// ---------- Sync dreams when user changes ----------
useEffect(() => {
  if (currentUser?.username) {
    const userDreams = loadDreamsForUser(currentUser.username);
    setDreams(userDreams);
  } else {
    setDreams([]);
  }
}, [currentUser, setDreams]);

// ---------- Persist currentUser ----------
useEffect(() => {
  if (currentUser) {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  } else {
    localStorage.removeItem("currentUser");
  }
}, [currentUser]);

  // ---------- Dream Handlers ----------
  const handleAddDream = (newDream) => {
    if (!currentUser?.username) return;
    saveDreamForUser(currentUser.username, newDream);
    setDreams((prev) => [newDream, ...prev]);
  };

  function handleEditDream(updatedDreamData) {
    if (!currentUser) return;
    const updatedDream = updateDreamForUser(
      currentUser.username,
      updatedDreamData
    );
    if (!updatedDream) {
      console.error("Updated dream is invalid:", updatedDreamData);
      alert("Failed to update dream. Make sure it exists before editing.");
      return;
    }
    updateDream(updatedDream);
    closeModal(activeModal);
    setDreamBeingEdited(null);
  }

  const handleDeleteDream = () => {
    if (!dreamToDelete || !currentUser?.username) return;
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


const handleSignIn = ({ email, password }) => {
  signin(email, password)
    .then(() => getUserInfo())
    .then((user) => {
      setCurrentUser(user);
      closeModal(activeModal);
      navigate("/profile");
    })
    .catch((err) => {
      console.error("Login error:", err);
    });
};

 

const handleEditProfileData = ({ name, avatar }) => {
    editProfile({ name, avatar })
      .then((res) => {
        console.log(res);
        setCurrentUser(res.data);
        closeModal(activeModal);
      })
      .catch((err) => console.log(err));
  };

 const handleRegister = ({ username, email, password, avatar }) => {
  register({ username, email, password, avatar })
    .then(() => signin(email, password)) // auto-login after register
    .then(() => getUserInfo())
    .then((user) => {
      setCurrentUser(user);
      closeModal(activeModal);
      navigate("/profile");
    })
    .catch((err) => {
      console.error("Registration flow error:", err);
    });
};


function handleSignOut() {
  signOut(); // handles both user + token
  setCurrentUser(null);
  navigate("/");
  closeModal(activeModal);
}


  // ---------- Modal handlers ----------
  const handleRegisterClick = () => openModal("register");
  const handleLoginClick = () => openModal("login");
  const handleEditProfileClick = () => openModal("edit-profile");
  const handleDreamClick = () => openModal("add-dream");
  const handleDeleteDreamClick = (dream) => {
    setDreamToDelete(dream);
    openModal("delete-dream");
  };
  const handleEditDreamClick = (dream) => {
    setDreamBeingEdited(dream);
    openModal("edit-dream");
  };
  const handleSignOutClick = () => openModal("sign-out");

  return (
    <div className="app">
      <MoonProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="app__container-landingpage">
                <Header />
                <Main
                  handleLoginClick={handleLoginClick}
                  handleRegisterClick={handleRegisterClick}
                  closeActiveModal={closeModal}
                />
                <Footer />
              </div>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home
                  handleSignOutClick={handleSignOutClick}
                  handleDreamClick={handleDreamClick}
                  handleEditProfileClick={handleEditProfileClick}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
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
            }
          />
        </Routes>

        {/* Modals */}
        <EditProfile
          closeActiveModal={closeModal}
          isOpen={activeModal === "edit-profile"}
          currentUser={currentUser}
          onEditProfileData={handleEditProfileData}
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
        />
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
      </MoonProvider>
    </div>
  );
}

export default App;
