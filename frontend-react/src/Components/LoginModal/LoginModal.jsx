import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, closeActiveModal, activeModal, onSignIn }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleLoginChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    onSignIn({ username: formData.username, password: formData.password });
    closeActiveModal();
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Login to Moon Dreamer"
      closeActiveModal={closeActiveModal}
      buttonText="Login"
      activeModal={activeModal}
      onSubmit={handleLoginSubmit}
    >
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          autoComplete="on"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleLoginChange}
          required
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          autoComplete="on"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleLoginChange}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
