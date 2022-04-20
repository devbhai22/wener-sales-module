import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://mkzyadsfkznopwggpnhm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTQ4ODY0OCwiZXhwIjoxOTU3MDY0NjQ4fQ.0V-YjpbnS1Cgu1mGhqfajwv3nlwVb8924TRgGsnhVeQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase