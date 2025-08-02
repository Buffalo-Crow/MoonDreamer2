import "./DeleteDreamModal.css";

function DeleteDreamModal({ closeActiveModal, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_open" : ""}`}>
      <div className="modal__delete-container">
        <button
          type="button"
          className="modal__close"
          onClick={closeActiveModal}
        ></button>
        <p className="modal__delete-caption-one">
          Are you sure you want to delete this dream?{" "}
        </p>
        <p className="modal__delete-caption-two">
          This action is irreversible.{" "}
        </p>
        <div className="modal__delete-buttons">
          <button className="modal__button-caption_delete">Yes</button>
          <button
            className="modal__button-caption_cancel"
            type="button"
            onClick={closeActiveModal}
          >
            {" "}
            Cancel{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDreamModal;
