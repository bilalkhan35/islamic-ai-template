import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import process from "node:process";

const DEFAULT_MODEL = "mistralai/mistral-7b-instruct";
const DEFAULT_FALLBACK_MODELS = [
  "mistralai/mistral-7b-instruct-v0.3",
  "openrouter/auto",
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

function openRouterDevMiddleware(env) {
  const apiKey =
    env.OPENROUTER_API_KEY || env.VITE_HF_TOKEN || env.VITE_OPENROUTER_API_KEY;

  return {
    name: "openrouter-dev-middleware",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (req, res, next) => {
        if (req.method !== "POST") {
          next();
          return;
        }

        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: {
                message:
                  "Missing OpenRouter key. Set OPENROUTER_API_KEY or VITE_HF_TOKEN in `.env`.",
              },
            }),
          );
          return;
        }

        try {
          const rawBody = await new Promise((resolve, reject) => {
            let body = "";
            req.on("data", (chunk) => {
              body += chunk;
            });
            req.on("end", () => resolve(body));
            req.on("error", reject);
          });

          const body = rawBody ? JSON.parse(rawBody) : {};
          const userMessage = body?.message?.trim();
          const systemPrompt =
            body?.systemPrompt?.trim() || "You are a helpful assistant.";
          const model =
            body?.model?.trim() || env.OPENROUTER_MODEL || DEFAULT_MODEL;
          const fallbackModels = parseFallbackModels(
            env.OPENROUTER_FALLBACK_MODELS,
          ).filter((candidate) => candidate !== model);

          if (!userMessage) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: { message: "Message is required." } }));
            return;
          }

          const origin =
            req.headers.origin ||
            req.headers.referer ||
            env.APP_URL ||
            "http://localhost:5173";

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

          const rawResponse = await openRouterResponse.text();

          let data;
          try {
            data = rawResponse ? JSON.parse(rawResponse) : {};
          } catch {
            data = {
              error: {
                message: rawResponse || "Unknown OpenRouter response.",
              },
            };
          }

          res.statusCode = openRouterResponse.status;
          res.setHeader("Content-Type", "application/json");

          if (!openRouterResponse.ok) {
            res.end(JSON.stringify(data));
            return;
          }

          res.end(
            JSON.stringify({
              reply:
                extractReply(data?.choices?.[0]?.message?.content) ||
                "No answer received.",
              model: data?.model || model,
            }),
          );
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: {
                message: error?.message || "Failed to contact OpenRouter.",
              },
            }),
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss(), openRouterDevMiddleware(env)],
  };
});
