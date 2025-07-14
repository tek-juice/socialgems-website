//helper function for supabase connection
import { createClient } from '@supabase/supabase-js';

export const getPublicSupabase = () => {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    if (!supabase) {
        throw new Error('Missing Supabase environment variables');
    }

    return supabase;
}
