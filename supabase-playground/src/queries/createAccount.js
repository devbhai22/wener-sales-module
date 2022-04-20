import supabase from '../supabase.js'

const user = supabase.auth.signUp({
    email:'hr@mail.com',
    password:'secret776hr'
})

export default user