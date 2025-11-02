
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface ParsedTransaction {
  description: string;
  amount: number;
  category: string;
}

const transactionSchema = {
  type: Type.OBJECT,
  properties: {
    description: { type: Type.STRING, description: 'A short summary of the transaction.' },
    amount: { type: Type.NUMBER, description: 'The transaction amount as a positive number.' },
    category: { type: Type.STRING, description: 'The transaction category.' },
  },
  required: ['description', 'amount', 'category'],
};

export const parseTransactionFromText = async (userInput: string): Promise<ParsedTransaction> => {
  const systemPrompt = `You are an expert financial assistant. Analyze the user's text and extract the transaction details.
- The 'category' should be one of: Food, Transport, Housing, Entertainment, Utilities, Shopping, Health, Income, or Other.
- The 'description' should be a short summary.
- The 'amount' should be a positive number.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [{ parts: [{ text: `User text: "${userInput}"` }] }],
    config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: transactionSchema,
    },
  });

  const jsonText = response.text.trim();
  const parsedJson = JSON.parse(jsonText);

  if (!parsedJson.description || !parsedJson.amount || !parsedJson.category) {
    throw new Error('Invalid JSON structure from API');
  }

  return parsedJson;
};

export const generateWeeklySummary = async (transactions: Transaction[]): Promise<string> => {
    if (transactions.length === 0) {
        return "You have no transactions in the last week.";
    }

    const transactionsJSON = JSON.stringify(transactions.map(t => ({
        description: t.description,
        amount: t.amount,
        type: t.type,
        category: t.category,
        date: t.date
    })));

    const systemPrompt = `You are a friendly and encouraging financial coach.
Based on the user's transaction data for the last week, provide:
1.  A short, 1-paragraph summary of their spending.
2.  Identify their top 3 spending categories.
3.  Give one simple, actionable piece of advice for the next week.

Be positive and helpful, not judgmental. Format your response using markdown.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ parts: [{ text: `Here is my transaction data: ${transactionsJSON}` }] }],
        config: {
            systemInstruction: systemPrompt,
        },
    });

    return response.text;
};
