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

        {moonImage && <img src={moonImage} alt={dream.moonSign} />}
      </div>
      <div>
        <p>Summary: {dream.summary}</p>
        <p>Moon-Sign: {dream.moonSign}</p>
        <p>Categories:{dream.categories}</p>
        <p>Tags:{dream.tags}</p>
        <button onClick={onBack}>← Back</button>
      </div>
      <button
        onClick={handleDeleteDreamClick}
        className="dream-detail__delete-btn"
      ></button>
      <button
        onClick={handleEditDreamClick}
        className="dream-detail__edit-btn"
      ></button>
    </div>
  );
}

export default DreamDetailCard;
