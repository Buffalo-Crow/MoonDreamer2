import "./ModalWithForm.css";

function ModalWithForm({ isOpen, title, children, closeActiveModal, buttonText }) {
return (
 <>
    <div className={`modal ${isOpen ? 'modal_open' : ''}`}>
        <div className="modal-with-form__container">
            <h2>{title}</h2>
            <button type="button" className="modal__close" onClick={closeActiveModal}></button>
            <form className="modal__form">
                {children}
                <div>
                    <button type="submit" className="modal__submit">
                        {buttonText}
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>
)

}


export default ModalWithForm;