import { useState, createContext } from "react";

export const DreamContext = createContext();

export function DreamProvider({ children }) {
  const [dreams, setDreams] = useState();
  const [selectedDream, setSelectedDream] = useState(null);
  const [dreamToDelete, setDreamToDelete] = useState(null);

  return (
    <DreamContext.Provider
      value={{
        dreams,
        setDreams,
        selectedDream,
        setSelectedDream,
        dreamToDelete,
        setDreamToDelete,
        setDreamToDelete,
      }}
    >
      {children}
    </DreamContext.Provider>
  );
}
