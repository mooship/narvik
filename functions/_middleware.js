const BLOCKED_BOTS = [
  // OpenAI
  "gptbot",
  "oai-searchbot",
  "chatgpt-user",
  // Anthropic
  "anthropic-ai",
  "claudebot",
  "claude-web",
  // Google AI training
  "google-extended",
  "googlebot-extended",
  // Other AI / LLM training crawlers
  "perplexitybot",
  "bytespider",
  "amazonbot",
  "meta-externalagent",
  "facebookbot",
  "applebot-extended",
  "cohere-ai",
  "ai2bot",
  "diffbot",
  "youbot",
  "omgili",
  "omgilibot",
  "imagesiftbot",
  "magpie-crawler",
  "icc-crawler",
  "timpibot",
  "velenpublicwebcrawler",
  "webzio-extended",
  "friendlycrawler",
  "dataforseobot",
];

export async function onRequest({ request, next }) {
  const ua = (request.headers.get("user-agent") ?? "").toLowerCase();

  if (BLOCKED_BOTS.some((bot) => ua.includes(bot))) {
    return new Response("Access denied.", { status: 403 });
  }

  return next();
}
