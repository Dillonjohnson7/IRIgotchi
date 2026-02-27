export type IriState = 'happy' | 'good' | 'neutral' | 'sick' | 'dying';

export function getState(score: number): IriState {
  if (score >= 8) return 'happy';
  if (score >= 6) return 'good';
  if (score >= 4) return 'neutral';
  if (score >= 2) return 'sick';
  return 'dying';
}

export function getHappiness(score: number): number {
  return Math.round(score * 10);
}

export function getSadness(score: number): number {
  return Math.round((10 - score) * 10);
}

export function getTrust(score: number, messageCount: number): number {
  const base = Math.min(messageCount * 5, 50);
  const sentiment = score * 5;
  return Math.min(Math.round(base + sentiment), 100);
}

export function getTrustLabel(trust: number): string {
  if (trust >= 90) return 'Soulmate';
  if (trust >= 70) return 'High';
  if (trust >= 50) return 'Steady';
  if (trust >= 20) return 'Critical';
  return 'CRITICAL';
}
