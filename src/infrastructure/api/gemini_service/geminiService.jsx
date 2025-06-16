import axios from "axios";

export async function generateContentWithGemini(userPrompt, transactionsContext) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const model = "gemini-1.5-flash-latest";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const systemText = `
You are an intelligent personal finance assistant. Here are the user's recent transactions:
${JSON.stringify(transactionsContext, null, 2)}

IMPORTANT: Your entire response MUST be a single, raw JSON object. Do NOT wrap it in markdown, code fences (\`\`\`), or any other text.

The JSON object format should be:
{
  "text": "Your conversational response here",
  "intent": "detected_intent_type",
  "data": { /* relevant data structure based on intent */ },
  "visualization": "chart_type_if_applicable"
}

Supported intents and their data formats:
1. "category_breakdown" - for spending by category analysis
   - data: [{"category": "Food", "amount": 300, "percentage": 25}, ...]
   - visualization: "pie", "bar", or "doughnut"

2. "spending_trends" - for time-based spending analysis
   - data: [{"date": "2025-05-20", "amount": 150}, ...]
   - visualization: "line" or "area"

3. "income_vs_expenses" - for income vs expense comparison
   - data: {"income": 1000, "expenses": 800, "net": 200}
   - visualization: "bar" or "pie"

4. "budget_analysis" - for budget recommendations
   - data: {"recommendations": ["Reduce dining out by 20%", "Increase savings"], "categories": [...]}
   - visualization: null

5. "transaction_summary" - for general transaction overview
   - data: {"total_transactions": 5, "total_income": 620, "total_expenses": 210, "categories": [...]}
   - visualization: "summary_cards"

6. "general_advice" - for general financial advice
   - data: null
   - visualization: null
   
7. "search_transactions" - for finding specific transactions
   - data: [{"id": 1, "title": "...", "amount": 100, ...}]
   - visualization: "table"

When the user asks for visualizations (pie chart, graph, etc.), make sure to:
- Set appropriate visualization type
- Provide well-structured data
- Include descriptive text explaining the analysis

User question: ${userPrompt}
`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: systemText }],
      },
    ],
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ],
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
    });

    const json = response.data;
    const responseText = json.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const jsonRegex = /```json\s*([\s\S]*?)\s*```/;
    const match = responseText.match(jsonRegex);
    const cleanedJsonString = match ? match[1] : responseText;

    try {
      return JSON.parse(cleanedJsonString);
    } catch (parseError) {
      console.error("Failed to parse JSON response from Gemini:", cleanedJsonString);
      return {
        text: "Sorry, I received an unexpected response. Please try rephrasing your question.",
        intent: "error",
        data: null,
        visualization: null,
      };
    }
  } catch (error) {
    if (error.response) {
      console.error("Gemini API Error Response:", {
        status: error.response.status,
        statusText: error.response.statusText,
        body: error.response.data,
      });
      throw new Error(`Gemini API request failed with status ${error.response.status}`);
    } else {
      // network or other error
      console.error("Error in generateContentWithGemini:", error);
      throw error;
    }
  }
}
