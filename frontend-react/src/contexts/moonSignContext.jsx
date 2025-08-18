import { createContext, useContext, useState, useEffect } from "react";
import { moonSignImages } from "../utils/constants";
import { moonSignDescriptions } from "../utils/moonSignDescriptions";

const MoonContext = createContext();

export function MoonProvider({ children }) {
  const [moonSign, setMoonSign] = useState(null);
  const [moonImage, setMoonImage] = useState("");
  const [moonDescription, setMoonDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMoonSign() {
      try {
        setLoading(true);
        const res = await fetch("/api/moon-sign");
        const data = await res.json();

        if (!data?.moonSign) {
          throw new Error("Moon sign missing from API response");
        }

        const key = data.moonSign.toLowerCase();
        setMoonSign(data.moonSign);
        setMoonImage(moonSignImages[key] || "");
        setMoonDescription(moonSignDescriptions[key] || "");
      } catch (err) {
        console.error("Error fetching moon sign:", err);
        setError("Failed to load moon sign");
      } finally {
        setLoading(false);
      }
    }

    fetchMoonSign();
  }, []);

  return (
    <MoonContext.Provider
      value={{ moonSign, moonImage, moonDescription, error, loading }}
    >
      {children}
    </MoonContext.Provider>
  );
}

export function useMoon() {
  return useContext(MoonContext);
}
