/**
 * AUTH STUB
 * ─────────────────────────────────────────────
 * Replace with your auth provider.
 *
 * Recommended:
 *   - NextAuth v5 (Auth.js)
 *   - Clerk
 *   - Supabase Auth
 *
 * When ready:
 * 1. Install provider SDK
 * 2. Configure in app/api/auth/[...nextauth]/route.js
 * 3. Replace getCurrentUser below with real session lookup
 * 4. Add middleware.js to protect platform routes
 */

export async function getCurrentUser() {
  return null;
}

export async function requireAuth() {
  return null;
}
