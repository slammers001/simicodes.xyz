const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function testIssuesTable() {
  try {
    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          title: 'Contact Form: Test User',
          description: 'Email: test@example.com\n\nMessage: Test message\n\nLocation: Test Location',
          status: 'open',
          type: 'bug',
          user_id: '00000000-0000-0000-0000-000000000001'
        }
      ]);
    
    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log('SUCCESS! Issue created:', data);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

testIssuesTable();
