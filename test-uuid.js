const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

async function testWithUUID() {
  try {
    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          title: 'Test User',
          description: 'Test description',
          status: 'new',
          type: 'contact',
          user_id: '00000000-0000-0000-0000-000000000000'
        }
      ]);
    
    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log('SUCCESS! Insert worked:', data);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

testWithUUID();
