import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
  dangerouslyAllowBrowser: true,
});

export interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}

export async function chat(history: ChatMsg[]): Promise<string> {
  const res = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    messages: [
      { role: 'system', content: 'You are a helpful assistant. Be concise.' },
      ...history,
    ],
  });
  return res.choices[0]?.message?.content?.trim() ?? '';
}
