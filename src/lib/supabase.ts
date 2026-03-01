import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are placeholders or missing
const isPlaceholder = (val: string | undefined) =>
    !val || val === 'YOUR_NEW_SUPABASE_URL' || val === 'YOUR_NEW_SUPABASE_ANON_KEY' || val === '';

// Fallback "mock" client if no valid credentials, to prevent top-level runtime crashes
const mockClient = {
    from: () => ({
        select: () => ({ eq: () => ({ gte: () => Promise.resolve({ data: [], error: null }) }) }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => ({ eq: () => ({ eq: () => Promise.resolve({ error: null }) }) }),
    }),
    auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
        signUp: () => Promise.resolve({ data: {}, error: null }),
        signOut: () => Promise.resolve({ error: null }),
    }
} as any;

if (isPlaceholder(supabaseUrl) || isPlaceholder(supabaseAnonKey)) {
    console.warn('FASTVIEW WARNING: Using placeholder Supabase credentials. Database features will be disabled. Update your .env file with real credentials to enable persistence.');
}

export const supabase = (isPlaceholder(supabaseUrl) || isPlaceholder(supabaseAnonKey))
    ? mockClient
    : createClient(supabaseUrl!, supabaseAnonKey!, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        }
    });
