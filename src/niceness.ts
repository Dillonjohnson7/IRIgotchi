import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
  dangerouslyAllowBrowser: true,
});

export async function niceness(text: string): Promise<number> {
  const res = await client.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    temperature: 0,
    max_tokens: 4,
    messages: [
      {
        role: 'system',
        content: 'Rate the niceness of the user\'s text from 0 to 10. 0 is cruel, 5 is neutral, 10 is extremely kind. Respond with ONLY the number.',
      },
      { role: 'user', content: text },
    ],
  });

  const raw = res.choices[0]?.message?.content?.trim() ?? '5';
  const n = parseInt(raw, 10);
  return isNaN(n) ? 5 : Math.max(0, Math.min(10, n));
}
