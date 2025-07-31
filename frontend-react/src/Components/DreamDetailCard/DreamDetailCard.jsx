import "./DreamDetailCard.css"
import CancerMoon from "../../assets/cancer_dreammoon.svg";

function DreamDetailCard({ dream, onBack }) {
  return (
    <div className="dream-detail-card">
      
      <div className="dream-detail__column">
      <p>Date: {dream.date}</p>
      <img className="dream-detail__image"src={CancerMoon} alt="moon" />
      </div>
      <div>
      <p>Summary: {dream.summary}</p>
      <p>Moon-Sign: {dream.sign}</p>
      <img src={dream.signIcon} alt={dream.sign} />
      <p>Categories:{dream.categories}</p>
      <p>Tags:{dream.tags}</p>
       <button onClick={onBack}>← Back</button>
       </div>
       
    </div>
  );
}

export default DreamDetailCard;