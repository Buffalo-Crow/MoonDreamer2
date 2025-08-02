import { useState } from "react";
import "./AddDreamModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { getMoonSignFromLocationAndDate } from "../../utils/api";

function AddDreamModal({ isOpen, closeActiveModal, activeModal, onAddDream }) {
  const [formData, setFormData] = useState({
    date: "",
    summary: "",
    categories: "",
    tags: "",
    location: "",
    moonSign: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleNewDreamChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleNewDreamSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const moonSign = await getMoonSignFromLocationAndDate(
        formData.location,
        formData.date
      );

      // Create new dream object with moonSign
      const newDream = {
        ...formData,
        moonSign,
        id: crypto.randomUUID(),
      };

      console.log("🆕 Submitting new dream:", newDream);

      // Pass to parent + reset form
      onAddDream(newDream);
      closeActiveModal();

      // reset form
      setFormData({
        date: "",
        summary: "",
        categories: "",
        tags: "",
        location: "",
        moonSign: "",
      });
    } catch (error) {
      console.error("Failed to fetch moon sign:", error);
      alert(
        "Failed to fetch moon sign. Please check the location and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <ModalWithForm
        isOpen={isOpen}
        title="Add your dream entry"
        closeActiveModal={closeActiveModal}
        buttonText="Add Dream"
        activeModal={activeModal}
        onSubmit={handleNewDreamSubmit}
        isLoading={isLoading}
        loadingMessage="Calculating your moon sign..."
        customSpinner={<div className="moon-spinner small" />}
      >
        <label className="modal__label">
          Date
          <input
            className="modal__input"
            type="date"
            name="date"
            placeholder="Date of Dream"
            value={formData.date}
            onChange={handleNewDreamChange}
            required
          />
        </label>
        <label className="modal__label">
          Summary
          <textarea
            className="modal__input"
            type="text"
            name="summary"
            placeholder="Describe your dream"
            value={formData.summary}
            onChange={handleNewDreamChange}
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
            name="categories"
            placeholder="Add any categories of your dream"
            onChange={handleNewDreamChange}
            value={formData.categories}
            required
          />
        </label>
        <label className="modal__label">
          Tags
          <input
            className="modal__input"
            type="text"
            name="tags"
            placeholder="Add any tags for your dream"
            onChange={handleNewDreamChange}
            value={formData.tags}
            required
          />
        </label>
        <label className="modal__label">
          Location of your Dream
          <input
            className="modal__input"
            type="text"
            name="location"
            placeholder="Where did you have your dream?"
            value={formData.location}
            onChange={handleNewDreamChange}
            required
          />
        </label>
        <p className="modal__label">
          🌙 Moon Sign will be auto-populated based on your date and location.
        </p>
      </ModalWithForm>
    </div>
  );
}

export default AddDreamModal;
