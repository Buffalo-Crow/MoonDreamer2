import "./AddDreamModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddDreamModal({ isOpen, closeActiveModal, activeModal }) {
  return (
    <div>
      <ModalWithForm
        isOpen={isOpen}
        title="Add your dream entry"
        closeActiveModal={closeActiveModal}
        buttonText="Submit"
        activeModal={activeModal}
      >
        <label className="modal__label">
          Date
          <input
            className="modal__input"
            type="date"
            name="dream-date"
            placeholder="Date of Dream"
            required
          />
        </label>
        <label className="modal__label">
          Summary
          <textarea
            className="modal__input"
            type="text"
            name="dream-summary"
            placeholder="Describe your dream"
            rows="5"
            autoComplete="off"
            required
          />
        </label>
        <label className="modal__label">
          Categories
          <input
            className="modal__input"
            type="text"
            name="dream-summary"
            placeholder="Add any categories of your dream"
            required
          />
        </label>
        <label className="modal__label">
          Tags
          <input
            className="modal__input"
            type="text"
            name="dream-tags"
            placeholder="Add any tags for your dream"
            required
          />
        </label>
        <label className="modal__label">
          Location of your Dream
          <input
            className="modal__input"
            type="text"
            name="dream-location"
            placeholder="Where did you have your dream?"
            // value=""
            required
          />
        </label>
      </ModalWithForm>
    </div>
  );
}

export default AddDreamModal;
