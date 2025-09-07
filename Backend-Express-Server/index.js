const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error");

dotenv.config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const moonApi = require("./routes/moonapi");
const aiInsightRoutes = require("./routes/aiInsights");
const dreamRoutes = require("./routes/dreams");

if (!process.env.JWT_SECRET) {
  console.error("❌ Missing JWT_SECRET in environment variables");
  process.exit(1);
}

// ----- Connect to MongoDB -----
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop server if DB connection fails
  });

const app = express();
app.use(cors());
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// API routes
app.use("/api/moon", moonApi);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dreams", dreamRoutes);
app.use("/api/insights", aiInsightRoutes);

// Error handling middleware
app.use(errorHandler);

// Serve React frontend
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend-react/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

