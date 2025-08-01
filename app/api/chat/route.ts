import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateSystemPrompt } from "@/constants/chatbot-data";

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// CORS headers - from environment variable
const corsHeaders = {
  "Access-Control-Allow-Origin":
    process.env.ALLOWED_ORIGIN || "https://miliyon-ayalew.netlify.app",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    // Debug: Log the origin of the request
    const origin = req.headers.get("origin");
    console.log("Request origin:", origin);
    console.log("Environment ALLOWED_ORIGIN:", process.env.ALLOWED_ORIGIN);
    console.log(
      "Final allowed origin:",
      corsHeaders["Access-Control-Allow-Origin"]
    );

    // Parse the request body to get the messages
    const { messages } = await req.json();

    // Get the last message from the user
    const lastMessage = messages[messages.length - 1];

    // Create a conversation history for context
    const conversationHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Generate content using Gemini
    const geminiStream = await genAI
      .getGenerativeModel({ model: "gemini-1.5-flash" })
      .generateContentStream({
        contents: [
          // Add system prompt for portfolio context
          {
            role: "user",
            parts: [
              {
                text: `${generateSystemPrompt()}

User message: ${lastMessage.content}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

    // Create a readable stream from the Gemini response
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of geminiStream.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // Return streaming response with CORS headers
    return new Response(readableStream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
}
