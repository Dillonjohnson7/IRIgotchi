import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid JSON body', bodyType: typeof body });
  }
  const text = body.text;
  if (typeof text !== 'string') {
    return res.status(400).json({ error: 'text string is required' });
  }

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        temperature: 0,
        max_tokens: 4,
        messages: [
          {
            role: 'system',
            content:
              "Rate the niceness of the user's text from 0 to 10. 0 is cruel, 5 is neutral, 10 is extremely kind. Respond with ONLY the number.",
          },
          { role: 'user', content: text },
        ],
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      return res.status(502).json({ error: err });
    }

    const data = await groqRes.json();
    const raw = data.choices?.[0]?.message?.content?.trim() ?? '5';
    const n = parseInt(raw, 10);
    const score = isNaN(n) ? 5 : Math.max(0, Math.min(10, n));
    return res.status(200).json({ score });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}
