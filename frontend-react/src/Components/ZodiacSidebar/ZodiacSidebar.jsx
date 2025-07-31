import "./ZodiacSidebar.css"
import { zodiacImages, zodiacSigns } from "../../utils/constants";

function ZodiacSidebar({}) {
  return (
    <div className="zodiac-sidebar">
      <section className="zodiac-sidebar__signs">
        <ul className="zodiac-sidebar__sign_list">
          {zodiacSigns.map((sign) => {
            return (
              <li key={sign} className={`zodiac-sidebar__sign zodiac-sidebar__sign--${sign}`}>
                <img
                  src={zodiacImages[sign]}
                  alt={sign}
                  className="zodiac-sidebar__sign-icon"
                />
              </li>

            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default ZodiacSidebar;
