import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lirqnfeqgljhccxcprdp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpcnFuZmVxZ2xqaGNjeGNwcmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0MjYxNDcsImV4cCI6MjAyMTAwMjE0N30.thl0zSwJW1cQGJxPBC9UfqDSW-pNR8kNXb3AHMBYKk8';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;