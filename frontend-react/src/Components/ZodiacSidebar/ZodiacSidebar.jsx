import "./ZodiacSidebar.css";
import { zodiacImages, zodiacSigns } from "../../utils/constants";

function ZodiacSidebar({ onFilter }) {
  return (
    <nav className="zodiac-sidebar" aria-label="Zodiac Filter Navigation">
      <ul className="zodiac-sidebar__sign_list">
        {zodiacSigns.map((sign) => {
          return (
            <li key={sign} className="zodiac-sidebar__sign-item">
              <button
                onClick={() => onFilter?.(sign)}
                className={`zodiac-sidebar__sign-button zodiac-sidebar__sign-button--${sign}`}
              >
                <img
                  src={zodiacImages[sign]}
                  alt={`${sign} symbol`}
                  className="zodiac-sidebar__sign-icon"
                />{" "}
                {sign}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default ZodiacSidebar;
