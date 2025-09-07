const Dream = require("../models/dream");
const AIInsight = require("../models/aiInsight");
const { generateAIText } = require("../services/aiService"); // your fixed function

/**
 * Generate AI insight for a single dream
 */
const generateSingleInsight = (req, res, next) => {
  const dreamId = req.params.id;

  Dream.findOne({ _id: dreamId, userId: req.user._id })
    .orFail()
    .then((dream) => {
      return generateAIText(
        dream.summary || "Analyze this dream.",
        "claude-3-sonnet-20240229",
        "single",
        500
      ).then((aiSummary) => ({ dream, aiSummary }));
    })
    .then(({ dream, aiSummary }) => {
      return AIInsight.create({
        userId: req.user._id,
        dreamIds: [dream._id],
        summary: aiSummary,
        tags: [],
        scope: "single",
        model: "claude-3-sonnet-20240229",
      });
    })
    .then((insight) => res.status(201).send(insight))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Dream not found" });
      }
      return next(err);
    });
};

/**
 * Generate AI insight for a user's dream patterns
 */
const generateUserPatternInsight = (req, res, next) => {
  const { dreamIds } = req.body;

  Dream.find({ _id: { $in: dreamIds }, userId: req.user._id })
    .then((dreams) => {
      if (!dreams.length) {
        return res.status(404).send({ message: "No dreams found" });
      }

      const combinedText = dreams.map((d) => d.summary).join("\n\n");

      return generateAIText(
        combinedText,
        "claude-3-opus-20240229",
        "user-pattern",
        1000
      ).then((aiSummary) => ({ dreams, aiSummary }));
    })
    .then(({ dreams, aiSummary }) => {
      return AIInsight.create({
        userId: req.user._id,
        dreamIds: dreams.map((d) => d._id),
        summary: aiSummary,
        tags: [],
        scope: "user-pattern",
        model: "claude-3-opus-20240229",
      });
    })
    .then((insight) => res.status(201).send(insight))
    .catch(next);
};

/**
 * Generate AI insight across the community (admin or cron job)
 */
const generateCommunityInsight = (req, res, next) => {
  const { dreamIds } = req.body; // optional filter

  const query = dreamIds && dreamIds.length ? { _id: { $in: dreamIds } } : {};

  Dream.find(query)
    .then((dreams) => {
      if (!dreams.length) {
        return res.status(404).send({ message: "No dreams found" });
      }

      const combinedText = dreams.map((d) => d.summary).join("\n\n");

      return generateAIText(
        combinedText,
        "claude-3-opus-20240229",
        "community-pattern",
        2000
      ).then((aiSummary) => ({ dreams, aiSummary }));
    })
    .then(({ dreams, aiSummary }) => {
      return AIInsight.create({
        userId: req.user._id, // or an admin/system user
        dreamIds: dreams.map((d) => d._id),
        summary: aiSummary,
        tags: [],
        scope: "community-pattern",
        model: "claude-3-opus-20240229",
      });
    })
    .then((insight) => res.status(201).send(insight))
    .catch(next);
};

module.exports = {
  generateSingleInsight,
  generateUserPatternInsight,
  generateCommunityInsight,
};
