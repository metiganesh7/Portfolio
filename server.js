// server.js — FINAL WORKING VERSION
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fetch from "node-fetch"; 
import rateLimit from "express-rate-limit";
import cors from "cors";

const app = express();
app.use(express.json());

// ⭐ Enable CORS so frontend (5173) can call backend (3001)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET"],
  })
);

// ⭐ Protect your API
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
});
app.use("/api/chat", limiter);

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message)
      return res.status(400).json({ error: "Missing message field" });

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    console.log("OPENAI KEY LOADED:", OPENAI_KEY ? "YES" : "NO");

    if (!OPENAI_KEY)
      return res.status(500).json({ error: "OpenAI key missing" });

    // Chat payload
    const payload = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant who explains Ganesh's projects, skills, and portfolio clearly.",
        },
        { role: "user", content: message },
      ],
      max_tokens: 400,
      temperature: 0.2,
    };

    // Call OpenAI
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("OpenAI API ERROR:", errText);
      return res.status(500).json({ error: "OpenAI API error" });
    }

    const data = await r.json();

    // ⭐ Log raw response structure
    console.log(
      "OPENAI RAW RESPONSE:",
      JSON.stringify(data, null, 2)
    );

    // ⭐ Extract reply safely (supports all formats)
    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      data?.choices?.[0]?.delta?.content ||
      "No reply";

    return res.json({ reply });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`💬 Chatbot backend running on http://localhost:${PORT}`)
);
