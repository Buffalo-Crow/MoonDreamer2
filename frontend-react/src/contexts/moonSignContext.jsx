import { createContext, useContext, useState, useEffect } from "react";
import { moonSignImages } from "../utils/constants";
import { moonSignDescriptions } from "../utils/moonSignDescriptions";
import { getCachedMoonSign, saveMoonSignToCache } from "../utils/moonSignUtils";

const MoonContext = createContext();

export function MoonProvider({ children }) {
  const [moonSign, setMoonSign] = useState(null);
  const [moonImage, setMoonImage] = useState("");
  const [moonDescription, setMoonDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // prevent state updates after unmount

    async function fetchMoonSign() {
      setLoading(true);
      const today = new Date().toISOString().slice(0, 10);

      // 1️⃣ Check cache first
      const cached = getCachedMoonSign(today);
      if (cached && cached.moonSign) {
        if (!isMounted) return;
        setMoonSign(cached.moonSign);
        setMoonImage(cached.moonImage);
        setMoonDescription(cached.moonDescription);
        setLoading(false);
        return;
      }

      // 2️⃣ Fetch from backend API
      try {
        const res = await fetch("/api/moon/moon-sign");
        const data = await res.json();

        if (!data?.moonSign) throw new Error("Moon sign missing from API");

        const key = data.moonSign.toLowerCase();
        const moonData = {
          moonSign: data.moonSign,
          moonImage: moonSignImages[key] || "",
          moonDescription: moonSignDescriptions[key] || "",
        };

        if (!isMounted) return;
        setMoonSign(moonData.moonSign);
        setMoonImage(moonData.moonImage);
        setMoonDescription(moonData.moonDescription);

        // Save to cache
        saveMoonSignToCache(today, moonData);
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching moon sign:", err);
        setError("Failed to load moon sign");
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    fetchMoonSign();

    return () => {
      isMounted = false; // cleanup for double mount in dev
    };
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
