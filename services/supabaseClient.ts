
import { createClient } from '@supabase/supabase-js';

// Credentials provided by the user
const supabaseUrl = 'https://rojpzjhlxowydxjjtiza.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvanB6amhseG93eWR4amp0aXphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NTAwNDIsImV4cCI6MjA3OTQyNjA0Mn0.CZNQvsX83FqHp7mNILiFF4wolHJn_TojcmDsAEhgnKI';

export const supabase = createClient(supabaseUrl, supabaseKey);
