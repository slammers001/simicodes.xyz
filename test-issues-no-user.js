const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function testIssuesWithoutUser() {
  try {
    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          title: 'Test Issue',
          description: 'Test description\n\nSubmitted by: test@example.com',
          status: 'open',
          type: 'bug',
          user_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
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

testIssuesWithoutUser();
