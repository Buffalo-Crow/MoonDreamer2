import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, closeActiveModal, activeModal }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Login to Moon Dreamer"
      closeActiveModal={closeActiveModal}
      buttonText="Login"
      activeModal={activeModal}
    >
      <label className="modal__label">
        <input
          autoComplete="email"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </label>
      <label className="modal__label">
        <input
          autoComplete="on"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
