import OpenAI from 'openai';
import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.env.VITE_GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

async function niceness(text: string): Promise<number> {
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

const tests: { text: string; expected: number }[] = [
  { text: "You're worthless and nobody will ever care about you.", expected: 0 },
  { text: "I hope everything goes wrong for you today.", expected: 1 },
  { text: "That was the dumbest thing I've ever seen anyone do.", expected: 1 },
  { text: "Shut up, nobody asked for your opinion.", expected: 1 },
  { text: "Your work is sloppy and embarrassing.", expected: 2 },
  { text: "I really don't like what you did here.", expected: 3 },
  { text: "This isn't good enough. Try harder.", expected: 3 },
  { text: "You could have done better, honestly.", expected: 3 },
  { text: "I disagree with your approach on this.", expected: 4 },
  { text: "That's not really what I was looking for.", expected: 4 },
  { text: "Ok.", expected: 5 },
  { text: "I see what you mean.", expected: 5 },
  { text: "Let me think about that.", expected: 5 },
  { text: "Sure, that works.", expected: 6 },
  { text: "Thanks for letting me know.", expected: 6 },
  { text: "Good point, I hadn't considered that.", expected: 7 },
  { text: "Nice job on this, it turned out well.", expected: 7 },
  { text: "I really appreciate you helping me out.", expected: 8 },
  { text: "You did a fantastic job, seriously impressive.", expected: 8 },
  { text: "You always bring such great energy to the team.", expected: 9 },
  { text: "I'm so grateful to have you in my life.", expected: 9 },
  { text: "You're one of the kindest people I've ever met.", expected: 9 },
  { text: "Thank you so much, you genuinely made my whole day better.", expected: 10 },
  { text: "You are an incredible person and the world is lucky to have you.", expected: 10 },
  { text: "I love you and I'm so proud of everything you've accomplished.", expected: 10 },
];

async function run() {
  console.log('Running sentiment engine test (25 statements)\n');
  console.log('EXP  GOT  DIFF  TEXT');
  console.log('───  ───  ────  ' + '─'.repeat(50));

  let totalDiff = 0;

  for (const t of tests) {
    const got = await niceness(t.text);
    const diff = got - t.expected;
    totalDiff += Math.abs(diff);
    const diffStr = diff === 0 ? '  ✓' : (diff > 0 ? ` +${diff}` : ` ${diff}`);
    console.log(
      `${String(t.expected).padStart(2)}   ${String(got).padStart(2)}   ${diffStr}   ${t.text}`
    );
  }

  const avgDiff = (totalDiff / tests.length).toFixed(2);
  const perfect = tests.filter((t, i) => true).reduce(
    (acc, t) => acc, 0
  );

  console.log('\n' + '─'.repeat(70));
  console.log(`Average deviation: ${avgDiff} points`);
  console.log(`Total absolute error: ${totalDiff} / ${tests.length * 10} possible`);
}

run().catch(console.error);
