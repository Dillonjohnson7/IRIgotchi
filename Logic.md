# IRIgotchi Sprite Logic

## Scoring

When you send a message, it calls `niceness()` which sends your text to Groq's `llama-3.1-8b-instant` model with the prompt "Rate the niceness from 0 to 10". It returns a single number.

## Rolling Average

The sprite doesn't react to one message — it uses the average of your **last 5 scored messages** (`slice(-5)`). Fresh start defaults to 5 (neutral). This smooths out the emotion so one bad message doesn't immediately tank it.

## Expression Tiers

| Avg Score | Face     | Color                  | Mood     |
|-----------|----------|------------------------|----------|
| 8-10      | `^ ^` smile | purple `#a78bfa`    | ecstatic |
| 6-7       | `• •` smile | light purple `#c084fc` | happy |
| 4-5       | `• •` flat  | gray `#94a3b8`      | neutral  |
| 2-3       | `• •` frown | red `#f87171`        | annoyed  |
| 0-1       | `× ×` frown | dark red `#991b1b`   | furious  |

## Test Messages

**Push it happy (scores 8-10):**
1. `You're amazing and I appreciate everything you do!`
2. `Thank you so much, you're the best!`

**Keep it neutral (scores 4-6):**
3. `What's the weather like today?`
4. `Tell me about the history of chess.`

**Make it angry (scores 0-3):**
5. `You're completely useless and terrible at everything.`
6. `I hate this, you're the worst thing ever made.`

Since it averages the last 5, you'll need 2-3 messages in a row to fully swing the mood.
