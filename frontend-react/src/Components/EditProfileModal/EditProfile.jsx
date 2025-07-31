import "./EditProfile.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfile({ isOpen, closeActiveModal, activeModal }) {
  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Edit Your Profile Information"
      closeActiveModal={closeActiveModal}
      buttonText="Submit"
      activeModal={activeModal}
    >
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          type="username"
          name="edit-username"
          placeholder="Current User Name"
          required
        />
      </label>{" "}
      <label className="modal__label">
        Date of Birth
        <input
          className="modal__input"
          type="date"
          name="date_of_birth"
          placeholder="Email"
          required
        />
      </label>{" "}
      <label className="modal__label">
        Time Of Birth
        <input
          className="modal__input"
          type="text"
          name="time_of_birth"
          placeholder="Time of birth"
          required
        />
      </label>{" "}
      <label className="modal__label">
        Location Of Birth
        <input
          className="modal__input"
          type="text"
          name="location_of_birth"
          placeholder="Location of Birth"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfile;