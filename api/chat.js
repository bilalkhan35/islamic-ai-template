const DEFAULT_MODEL = "mistralai/mistral-7b-instruct:free";
const DEFAULT_FALLBACK_MODELS = [
  "mistralai/mistral-7b-instruct:free",
  "mistralai/mistral-7b-instruct-v0.3",
  "mistralai/mistral-7b-instruct",
];
const REQUEST_TIMEOUT_MS = 20000;

function parseFallbackModels(value) {
  if (!value) {
    return DEFAULT_FALLBACK_MODELS;
  }

  return value
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean);
}

function getApiKey() {
  return (
    process.env.OPENROUTER_API_KEY ||
    process.env.VITE_HF_TOKEN ||
    process.env.VITE_OPENROUTER_API_KEY
  );
}

function getRequestBody(req) {
  if (!req.body) {
    return {};
  }

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return req.body;
}

function extractReply(content) {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((part) =>
        typeof part === "string"
          ? part
          : part?.type === "text"
            ? (part.text || "")
            : "",
      )
      .join("")
      .trim();
  }

  return "";
}

async function fetchWithTimeout(url, options, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        `Request timed out after ${Math.floor(timeoutMs / 1000)} seconds.`,
      );
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: { message: "Method not allowed." } });
  }

  const apiKey = getApiKey();

  if (!apiKey) {
    return res.status(500).json({
      error: {
        message:
          "Missing OpenRouter API key. Set OPENROUTER_API_KEY in your Vercel project environment variables.",
      },
    });
  }

  const body = getRequestBody(req);
  const userMessage = body?.message?.trim();
  const systemPrompt =
    body?.systemPrompt?.trim() || "You are a helpful assistant.";
  const requestedModel = body?.model?.trim();
  const model =
    requestedModel || process.env.OPENROUTER_MODEL || DEFAULT_MODEL;
  const fallbackModels = parseFallbackModels(
    process.env.OPENROUTER_FALLBACK_MODELS,
  ).filter((candidate) => candidate !== model);

  if (!userMessage) {
    return res.status(400).json({
      error: { message: "Message is required." },
    });
  }

  const origin =
    req.headers.origin ||
    req.headers.referer ||
    process.env.APP_URL ||
    "https://openrouter.ai";

  try {
    const openRouterResponse = await fetchWithTimeout(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey.trim()}`,
          "Content-Type": "application/json",
          "HTTP-Referer": origin,
          "X-Title": body?.title?.trim() || "Islamic AI",
        },
        body: JSON.stringify({
          model,
          ...(fallbackModels.length > 0 ? { models: fallbackModels } : {}),
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
        }),
      },
    );

    const rawText = await openRouterResponse.text();

    let data;
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = { error: { message: rawText || "Unknown OpenRouter response." } };
    }

    if (!openRouterResponse.ok) {
      return res.status(openRouterResponse.status).json(data);
    }

    return res.status(200).json({
      reply: extractReply(data?.choices?.[0]?.message?.content) || "No answer received.",
      model: data?.model || model,
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: error?.message || "Failed to contact OpenRouter.",
      },
    });
  }
}
