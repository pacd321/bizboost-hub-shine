const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://borvxercmcoylcmpcbyh.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcnZ4ZXJjbWNveWxjbXBjYnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3Nzk5OTgsImV4cCI6MjA2MTM1NTk5OH0.urRJDm1S2XDTrjK3obuyj4Rk8Ftj9AOB1Vf_SJM-RD8'; // Use service role key for admin access

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function syncAuthUsersToCustomers() {
  // Fetch all users from the auth.users table (admin API)
  const { data: users, error } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  if (error) {
    console.error('Error fetching auth users:', error.message);
    return;
  }

  for (const user of users) {
    const { email, user_metadata, id } = user;
    const name = user_metadata?.name || '';
    // Upsert into customers table
    const { error: upsertError } = await supabase
      .from('customers')
      .upsert([
        {
          email,
          name,
          auth_id: id // optional: store auth user id for reference
        }
      ], { onConflict: ['email'] });
    if (upsertError) {
      console.error(`Error upserting customer ${email}:`, upsertError.message);
    } else {
      console.log(`Upserted customer: ${email}`);
    }
  }
}

syncAuthUsersToCustomers();