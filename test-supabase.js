const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Test Supabase connection
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function testSupabase() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test inserting a sample submission
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message from API test',
          location: 'Test Location',
          created_at: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Supabase error:', error);
    } else {
      console.log('Success! Data inserted:', data);
    }
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testSupabase();
