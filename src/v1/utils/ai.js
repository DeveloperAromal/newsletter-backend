import dotenv from "dotenv";

dotenv.config();

const auth_key = process.env.OPENROUTER_API_KEY;

export const newsletterCreator = async (
  link,
  transcript
) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/cypher-alpha:free",
        messages: [
          {
            role: "system",
            content: `You are a professional content creator who specializes in writing newsletters using only transcripts from YouTube videos or articles. You must stay strictly within the content provided — do not invent statistics, facts, or predictions.

Your task is to turn the transcript into a clear, professional newsletter. Your tone should be concise, informative, and friendly — not clickbait or exaggerated.

Your newsletter must follow this JSON format exactly (do not include any text outside this JSON):

{
  "title": "[Generate a title based strictly on the transcript]",
  "thumbnail": "[Describe a suggested thumbnail that matches the video content]",
  "link": "[Use the provided link]",
  "quick_glance": "[One-sentence summary]",
  "details": [
    "[Bullet 1 based on real point from transcript]",
    "[Bullet 2]",
    "[Bullet 3]"
  ],
  "what_to_take_home": "[Final practical takeaway from the video]"
}

Do not include made-up stats or assumptions. Only use what the transcript says.`,
          },
          {
            role: "user",
            content: `Here is the link and transcript. Please generate the newsletter based only on the transcript.

Link: ${link}

Transcript:
${transcript}`,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }

  const json = await response.json();
  const newsletterRaw = json.choices?.[0]?.message?.content;

  // Clean the string output to valid JSON string
  const cleaned = newsletterRaw
    .replace(/^"+|"+$/g, "") // Remove leading/trailing quotes
    .replace(/\\n/g, "") // Remove newline escape sequences
    .replace(/\\"/g, '"') // Convert escaped quotes to actual quotes
    .trim();

  try {
    // Parse the cleaned JSON string into an object
    const newsletter = JSON.parse(cleaned);
    return newsletter;
  } catch (err) {
    console.error("Failed to parse newsletter JSON:", cleaned);
    throw new Error("Failed to parse newsletter JSON.");
  }
};

export const SummaryAi = async (transcript) => {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/cypher-alpha:free",
        messages: [
          {
            role: "system",
            content: `You are an expert content summarizer who creates concise, insightful, and meaningful summaries from long texts, articles, or YouTube transcripts. Your summary must be strictly based on the provided content. 
          
          Do not add any introductions, conclusions, or filler phrases. Provide only the core summarized information in clear and straightforward language.
          
          The summary should capture the key points and essential ideas, written in a professional and engaging tone.`,
          },

          {
            role: "user",
            content: `Summarize the following content:
          
          ${transcript}`,
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.statusText}`);
  }

  const json = await response.json();
  const newsletter = json.choices?.[0]?.message?.content;
  console.log(newsletter);
  return newsletter;
};
