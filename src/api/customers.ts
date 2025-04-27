import { supabase } from '../supabaseClient';

export async function getCustomers() {
  // Get customers from the customers table
  const { data: customers, error } = await supabase
    .from('customers')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching customers:', error);
    return [];
  }

  return customers || [];
}

export async function createCustomer(customerData: {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  state?: string;
}) {
  const { data, error } = await supabase
    .from('customers')
    .insert([{
      ...customerData,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating customer:', error);
    throw error;
  }

  return data;
}

export async function updateCustomer(id: string, customerData: {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
}) {
  const { data, error } = await supabase
    .from('customers')
    .update(customerData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating customer:', error);
    throw error;
  }

  return data;
} 