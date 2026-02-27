export interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}

export async function chat(history: ChatMsg[]): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: history }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error ?? 'Request failed');
  }

  const data = await res.json();
  return data.content ?? '';
}
