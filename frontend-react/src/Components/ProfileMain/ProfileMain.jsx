import { useState } from "react";
import { initialDreams } from "../../utils/constants";
import "./ProfileMain.css";
import ZodiacSidebar from "../ZodiacSidebar/ZodiacSidebar";
import DreamPreviewList from "../DreamPreviewList/DreamPreviewList";
import DreamDetailCard from "../DreamDetailCard/DreamDetailCard";

function ProfileMain() {
  const [selectedSign, setSelectedSign] = useState(null); // zodiac filter
  const [selectedDream, setSelectedDream] = useState(null); // full card view
  const [dreams, setDreams] = useState(initialDreams); // can be fetched

const filteredDreams = selectedSign
    ? dreams.filter((dreams) => dreams.sign === selectedSign)
    : dreams;

  return (
    <>
      <div className="profile-main">
        <ZodiacSidebar onSelectSign={setSelectedSign} />

        {selectedDream ? (
          <DreamDetailCard
            dream={selectedDream}
            onBack={() => setSelectedDream(null)}
          />
        ) : (
          <DreamPreviewList
            dreams={filteredDreams}
            onSelectDream={setSelectedDream}
          />
        )}
      </div>
    </>
  );
}

export default ProfileMain;
