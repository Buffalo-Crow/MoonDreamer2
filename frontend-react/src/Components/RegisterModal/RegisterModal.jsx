import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({ isOpen, closeActiveModal, activeModal }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (formData.password !== formData.passwordRepeat){
  //       setPasswordError("Passwords do not match");
  //       return;}
  //     setPasswordError("");
  //     // Handle registration logic here
  //     console.log("Registration data:", formData);
  //     closeActiveModal();
  // };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Register"
      closeActiveModal={closeActiveModal}
      buttonText="Sign Up"
      activeModal={activeModal}
      // onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Username
        <input
          autoComplete="username"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={20}
        />
      </label>
      <label className="modal__label">
        Email
        <input
          autoComplete="email"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          minLength={5}
          maxLength={50}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          autoComplete="on"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          minLength={8}
          maxLength={20}
          required
        />
        {/* {passwordError && <span className="modal__error">{passwordError}</span>} */}
      </label>
      <label className="modal__label">
        Repeat Password
        <input
          autoComplete="on"
          type="password"
          name="passwordRepeat"
          placeholder="Repeat Password"
          value={formData.passwordRepeat}
          onChange={handleChange}
          required
          minLength={8}
          maxLength={20}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
