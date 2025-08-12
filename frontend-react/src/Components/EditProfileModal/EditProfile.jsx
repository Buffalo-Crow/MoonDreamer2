import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

function EditProfile({
  isOpen,
  closeActiveModal,
  activeModal,
  onCompleteProfile,
}) {
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    username: "",
    avatarUrl: "",
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        username: currentUser.username || "",
        avatarUrl: currentUser.avatarUrl || "",
      });
    }
  }, [isOpen, currentUser]);

  const handleEditProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfileSubmit = (e) => {
    e.preventDefault();
    onCompleteProfile({
      username: formData.username,
      avatarUrl: formData.avatarUrl,
    });
    closeActiveModal();
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
          name="avatarUrl"
          placeholder="Image URL"
          value={formData.avatarUrl}
          required
          onChange={handleEditProfileChange}
        />
      </label>{" "}
    </ModalWithForm>
  );
}

export default EditProfile;
