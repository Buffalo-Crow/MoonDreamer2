require("dotenv").config();
const { Anthropic } = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function runTest() {
  try {
    const response = await client.messages.create({
      model: "claude-3-haiku-20240307", // cheap + fast test model
      max_tokens: 100,
      messages: [
        { role: "user", content: "Write me a short sentence about dreams and the moon." }
      ],
    });

    console.log("✅ Anthropic test response:");
    console.log(response.content[0].text);
  } catch (err) {
    console.error("❌ Anthropic test failed:", err);
  }
}

runTest();