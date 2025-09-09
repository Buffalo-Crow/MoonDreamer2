import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

function EditProfile({
  isOpen,
  closeActiveModal,
  activeModal,
  onEditProfileData,
}) {
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        username: currentUser.username || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    onEditProfileData({
      ...formData,
    });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Edit Your Profile"
      closeActiveModal={closeActiveModal}
      buttonText="Submit"
      activeModal={activeModal}
      onSubmit={handleEditProfileSubmit}
    >
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          name="username"
          placeholder="Current User Name"
          value={formData.username}
          required
          onChange={handleEditProfileChange}
        />
      </label>{" "}
      <label className="modal__label">
        Avatar
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="Image URL"
          value={formData.avatar}
          required
          onChange={handleEditProfileChange}
        />
      </label>{" "}
    </ModalWithForm>
  );
}

export default EditProfile;
