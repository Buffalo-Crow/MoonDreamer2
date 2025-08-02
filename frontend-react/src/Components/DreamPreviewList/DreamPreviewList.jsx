import "./DreamPreviewList.css";
import Moon from "../../assets/Moon.svg";

function DreamPreviewList({ dreams, onSelectDream }) {
  console.log("🧠 Dreams in Preview List:", dreams);
  return (
    <>
      <ul className="dream-preview-list">
        {dreams.map((dream) => (
          <li
            key={dream.id}
            className="dream-preview"
            onClick={() => onSelectDream(dream)}
          >
            <div className="dream-preview__container">
              <div className="dream-preview__content">
                <img
                  className="dream-preview__moon-icon"
                  src={Moon}
                  alt="moon"
                />
              </div>
              <p className="dream-preview__description">
                {dream.summary.substring(0, 100)}...
              </p>
              <span className="dream-preview__date">{dream.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DreamPreviewList;
