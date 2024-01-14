import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import supabase from '../../utils/supabase'
import { Container } from "shards-react";

const Logout = () => {
    const history = useHistory()

    useEffect(() => {
      if(window.confirm("Are you sure you want to logout?")){
        supabase.auth.signOut().then(()=>{
          history.push('/login')
        })
      } else {
        history.push('/dashboard')
      }
      

    }, []);
    

  return (
    <Container
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '83vh' }}
    >
        <p>Logging out...</p>    
    </Container>
  )

};

export default Logout;