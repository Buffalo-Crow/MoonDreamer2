import "./DeleteDreamModal.css"


function DeleteDreamModal () {
    return (
        <div className="modal__delete-container">
        <p className="modal__delete-caption-one">
          Are you sure you want to delete this item?{" "}
        </p>
        <p className="modal__delete-caption-two">
          This action is irreversible.{" "}
        </p>
        <div className="modal__delete-buttons">
          <button
            onClick={handleDeleteSubmit}
            className="modal__button-caption_delete"
          >
            Yes delete this item
          </button>
          <button
            className="modal__button-caption_cancel"
            type="button"
            onClick={closeActiveModal}
          >
            {" "}
          </button>
          <button
            type="button"
            className="modal__close modal__close_delete"
            onClick={closeActiveModal}
          ></button>
          Cancel
        </div>
      </div>
  
    )

}

export default  DeleteDreamModal;