require('dotenv').config();
console.log('Environment variables check:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Set' : 'Not set');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Set' : 'Not set');
console.log('POSTHOG_API_KEY:', process.env.POSTHOG_API_KEY ? 'Set' : 'Not set');
