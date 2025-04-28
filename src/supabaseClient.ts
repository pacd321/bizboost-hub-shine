import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://borvxercmcoylcmpcbyh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvcnZ4ZXJjbWNveWxjbXBjYnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3Nzk5OTgsImV4cCI6MjA2MTM1NTk5OH0.urRJDm1S2XDTrjK3obuyj4Rk8Ftj9AOB1Vf_SJM-RD8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);