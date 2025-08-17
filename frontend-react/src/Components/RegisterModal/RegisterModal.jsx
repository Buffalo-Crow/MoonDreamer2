import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, closeActiveModal, activeModal, onRegister }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
    avatarUrl: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [usernameError, setUsernameError] = useState("");

  // Load users from localStorage
  const loadUsers = () => JSON.parse(localStorage.getItem("users")) || [];

  // Validate unique username
  const validateUsername = (name) => {
    const users = loadUsers();
    const exists = users.some(
      (u) => u.username.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (exists) {
      setUsernameError("Username already exists");
      return false;
    }
    setUsernameError("");
    return true;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "username" && value.trim() !== "") {
      validateUsername(value);
    }
  };

  // Handle form submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    if (!validateUsername(formData.username)) return;

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
    setAvatarError("");

    try {
      const users = loadUsers();

      const newUser = {
        id: Date.now(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password, // 
        avatarUrl: formData.avatarUrl.trim(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      onRegister(newUser);

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        avatarUrl: "",
      });

      closeActiveModal();
    } catch (error) {
      console.error("Error registering user:", error);
      alert("There was an error registering your account. Please try again.");
    }
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
        {usernameError && <span className="modal__error">{usernameError}</span>}
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
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatarUrl"
          placeholder="Image URL"
          value={formData.avatarUrl}
          onChange={handleChange}
        />
        {avatarError && <span className="modal__error">{avatarError}</span>}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
