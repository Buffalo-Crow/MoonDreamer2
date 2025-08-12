import "./DreamDetailCard.css";
import { moonSignImages } from "../../utils/constants";

function DreamDetailCard({
  dream,
  onBack,
  handleDeleteDreamClick,
  handleEditDreamClick,
}) {
  const { date, summary, moonSign, categories, tags } = dream;
  const moonImage = moonSignImages[moonSign?.toLowerCase()];

  return (
    <div className="dream-detail-card">
      <div className="dream-detail__column">
        <p>{dream.date}</p>
        {moonImage && (
          <img
            className="dream-detail__image"
            src={moonImage}
            alt={dream.moonSign}
          />
        )}
      </div>

      <div className="dream-detail__scrollable-content">
        <div className="dream-detail__container">
          <p>Summary: {dream.summary}</p>
          <p>Moon-Sign: {dream.moonSign}</p>
          <p>Categories: {dream.categories}</p>
          <p>Tags: {dream.tags}</p>
        </div>
      </div>

      <div className="dream-detail__btn-container">
        <div>
          <button
            onClick= {()=> handleDeleteDreamClick(dream)}
            className="dream-detail__delete-btn"
          ></button>
          <button
            onClick={handleEditDreamClick}
            className="dream-detail__edit-btn"
          ></button>
        </div>
        <button className="dream-detail__back-btn" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default DreamDetailCard;
