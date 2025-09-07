const mongoose = require("mongoose");

const aiInsightSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  dreamIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dream",
      required: true,
    },
  ],

  summary: {
    type: String,
    required: true,
  },

  tags: [String],

  scope: {
    type: String,
    enum: ["single", "user-pattern", "communtity-pattern"],
    default: "single",
  },

  model: {
    type: String,
    enum: ["gpt-3.5-turbo", "gpt-4"],
    default: "gpt-3.5-turbo",
  },

  version: {
    type: Number,
    default: 1,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("aiInsight", aiInsightSchema);
