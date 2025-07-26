import { useState } from "react";
import "./App.css";
import MoonSignDisplay from "./MoonSignDisplay";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main/Main";
import RegisterModal from "./Components/RegisterModal/RegisterModal";
import LoginModal from "./Components/LoginModal/LoginModal";

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

  return (
    <>
      <div className="app">
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
  );
}

export default App;
