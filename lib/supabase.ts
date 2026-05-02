import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Copy .env.local.example → .env.local and fill in your project credentials.'
  );
}

// Server-side client using the anon key (safe for API routes)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Service-role client — only use in scripts/server actions, never in browser
export function createServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for this operation.');
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}
