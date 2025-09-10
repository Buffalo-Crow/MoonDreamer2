import "./AiInsights.css";
import { useState } from "react";
import { fetchAIInsight } from "../../utils/aiInsights";

function AIInsights({ dreamId, token }) {
  const [aiSummary, setAiSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [scope, setScope] = useState("single"); // single / user-pattern / community

  const handleGenerate = async () => {
    setLoading(true);
    setAiSummary("");

    try {
      const result = await fetchAIInsight(scope, dreamId, token);
      setAiSummary(result);
    } catch {
      setAiSummary("Failed to generate AI insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-insights-container">
      <div className="scope-select">
        {["single", "user-pattern", "community"].map((option) => (
          <label key={option} style={{ marginRight: "1rem" }}>
            <input
              type="radio"
              name="scope"
              value={option}
              checked={scope === option}
              onChange={() => setScope(option)}
            />{" "}
            {option.replace("-", " ").toUpperCase()}
          </label>
        ))}
      </div>

      <button className ="ai-insights-button"onClick={handleGenerate} disabled={loading} style={{ marginTop: "0.5rem" }}>
        {loading ? "Generating..." : "Get AI Insights"}
      </button>

      {aiSummary && (
        <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
          <strong>AI Insights:</strong>
          <p>{aiSummary}</p>
        </div>
      )}
    </div>
  );
}

export default AIInsights;
