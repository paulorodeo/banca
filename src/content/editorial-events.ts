import { z } from 'zod';
/** Contract for a future VPS revision authority, not an enabled webhook. */
export const editorialEventSchema = z.object({
  id: z.string().min(1).max(160),
  revision: z.string().regex(/^[a-zA-Z0-9_-]{1,100}$/),
  operation: z.enum(['publish', 'update', 'withdraw', 'delete', 'rename', 'category']),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  previousSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
});
export function invalidationScope(input: unknown) {
  const event = editorialEventSchema.parse(input);
  return { revision: event.revision, collections: ['articles', 'categories', 'home'], slugs: [...new Set([event.slug, event.previousSlug].filter((slug): slug is string => Boolean(slug)))] };
}
/** Verify HMAC over timestamp + '.' + raw body. Replay IDs require external durable storage. */
export async function verifyEditorialSignature(body: string, timestamp: string, signature: string, secret: string, now = Date.now()) {
  if (!/^\d{13}$/.test(timestamp) || Math.abs(now - Number(timestamp)) > 300_000 || !/^[a-f0-9]{64}$/.test(signature) || body.length > 16_384) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const bytes = Uint8Array.from(signature.match(/../g) ?? [], item => parseInt(item, 16));
  return crypto.subtle.verify('HMAC', key, bytes, encoder.encode(`${timestamp}.${body}`));
}
