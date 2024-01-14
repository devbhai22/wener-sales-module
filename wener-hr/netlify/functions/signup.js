const { createClient } = require('@supabase/supabase-js');
const { json, send } = require('@netlify/functions');

const supabaseUrl = 'https://mkzyadsfkznopwggpnhm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTQ4ODY0OCwiZXhwIjoxOTU3MDY0NjQ4fQ.0V-YjpbnS1Cgu1mGhqfajwv3nlwVb8924TRgGsnhVeQ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

exports.handler = async function (event) {
  if (event.httpMethod === 'POST') {
    try {
      const { email, password } = JSON.parse(event.body);

      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        return send({ statusCode: 400, body: JSON.stringify({ error: error.message }) });
      }

      return send({ statusCode: 200, body: JSON.stringify({ user_id: user.id }) });
    } catch (e) {
      console.error(e);
      return send({ statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) });
    }
  }

  return send({ statusCode: 404, body: 'Not Found' });
};
