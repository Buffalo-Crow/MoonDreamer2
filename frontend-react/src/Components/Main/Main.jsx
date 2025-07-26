import "./Main.css";
import MainLogo from "../../assets/Logo.svg";

function Main({handleLoginClick, handleRegisterClick,}) {
  return (
    <div className="main">
      <img className="main__logo" src={MainLogo} alt="moon dreamer logo" />
      <h2 className="main__title">Welcome to Moon Dreamer</h2>
      <p className="main__description">
        Track your dreams and discover your moon sign patterns.
      </p>
      <div className="main__buttons">
        <button onClick={handleLoginClick} className="login__btn">
          Login
        </button>
        <button onClick={handleRegisterClick} className="register__btn">
          Register
        </button>
      </div>
    </div>
  );
}

export default Main;
