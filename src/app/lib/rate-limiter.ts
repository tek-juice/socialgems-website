// handles rate limiting so user cannot update passwords for too many times in a single period of time.
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();

export function checkRateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > windowMs) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  rateLimitMap.set(ip, { ...entry, count: entry.count + 1 });
  return true;
}