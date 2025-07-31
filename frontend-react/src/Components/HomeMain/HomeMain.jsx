import "./HomeMain.css";
import MoonSignDisplay from "../../MoonSignDisplay";
import CancerMoon from "../../assets/cancer_dreammoon.svg";

function HomeMain() {
  return (
    <div className="home-main">
      <img className="home-main__image" src={CancerMoon} alt="Nebulous Moon" />
      {/* <MoonSignDisplay /> */}
      <h2 className="home-main__title">Moon Dreamer Archetype: Cancer Moon</h2>
      <p className="home-main__description">
        Hello Username you are a Cancer Dreamer. The overall themes for your
        dreaming experience is filled with emotionally charged visions and
        convoluted reflections of your inner self. In dreams your routine
        protective layer becomes soft for you to see your insights and
        sensitivities more clearly
      </p>
      {/* toggleswitch here and conditionally render what is shown above */}
    </div>
  );
}
export default HomeMain;
