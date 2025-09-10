// utils/aiInsights.js

const BACKEND_URL = "http://localhost:3001/api/ai-insights";

export const fetchAIInsight = async (scope, dreamId = null, token) => {
  try {
    let url = "";
    let body = null;

    if (scope === "single") {
      if (!dreamId) throw new Error("dreamId is required for single-scope insights");
      url = `${BACKEND_URL}/single/${dreamId}`;
    } else if (scope === "user-pattern") {
      url = `${BACKEND_URL}/user-pattern`;
      body = JSON.stringify({}); // include user-specific info if needed
    } else if (scope === "community") {
      url = `${BACKEND_URL}/community`;
      body = JSON.stringify({}); // include community-specific info if needed
    } else {
      throw new Error(`Invalid scope: ${scope}`);
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`AI service failed: ${response.status} ${text}`);
    }

    const data = await response.json();

    if (!data.aiResult) {
      throw new Error("No aiResult returned from backend");
    }

    return data.aiResult;
  } catch (err) {
    console.error("fetchAIInsight error:", err);
    throw err;
  }
};
