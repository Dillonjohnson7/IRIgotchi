export async function niceness(text: string): Promise<number> {
  const res = await fetch('/api/niceness', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(err.error ?? 'Request failed');
  }

  const data = await res.json();
  return typeof data.score === 'number' ? data.score : 5;
}
