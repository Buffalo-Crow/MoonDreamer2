import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function RegisterModal({ isOpen, closeActiveModal, activeModal, onRegister }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    dateOfBirth: "",
    timeOfBirth: "",
    locationOfBirth: "",
    avatarUrl: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [avatarError, setAvatarError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordRepeat) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (formData.avatarUrl.trim() !== "") {
      try {
        new URL(formData.avatarUrl);
      } catch (_) {
        setAvatarError("Please enter a valid URL");
        return;
      }
    }
    setPasswordError("");
    const { username, email, password } = formData;
    onRegister(formData);
    setFormData({
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      dateOfBirth: "",
      timeOfBirth: "",
      locationOfBirth: "",
      avatarUrl: "",
    });
    closeActiveModal();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Register"
      closeActiveModal={closeActiveModal}
      buttonText="Sign Up"
      activeModal={activeModal}
      onSubmit={handleRegisterSubmit}
    >
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          autoComplete="off"
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
          className="modal__input"
          autoComplete="new-email"
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
          className="modal__input"
          autoComplete="new-password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          minLength={8}
          maxLength={20}
          required
        />
        {passwordError && <span className="modal__error">{passwordError}</span>}
      </label>
      <label className="modal__label">
        Repeat Password
        <input
          className="modal__input"
          autoComplete="new-password"
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
      <label className="modal__label">
        Date of Birth
        <input
          className="modal__input"
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          required
          onChange={handleChange}
        />
      </label>{" "}
      <label className="modal__label">
        Time Of Birth
        <input
          className="modal__input"
          type="text"
          name="timeOfBirth"
          placeholder="Time of birth"
          value={formData.timeOfBirth}
          required
          onChange={handleChange}
        />
      </label>{" "}
      <label className="modal__label">
        Location Of Birth
        <input
          className="modal__input"
          type="text"
          name="locationOfBirth"
          placeholder="Location of Birth"
          required
          value={formData.locationOfBirth}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatarUrl"
          placeholder="Image URL"
          value={formData.avatarUrl}
          onChange={handleChange}
        />{" "}
        {avatarError && <span className="modal__error">{avatarError}</span>}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
