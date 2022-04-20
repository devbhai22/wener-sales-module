import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  NavItem,
  NavLink
} from "shards-react";
import supabase from "../../../../utils/supabase";

const UserActions = () => {
  const [profile, setProfile] = useState({})

  const history = useHistory()
  const user = supabase.auth.user()

  useEffect(() => {
    async function fetchData() {
      if (user) {
        let { data: profile, error1 } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
        if (error1) {
          console.log(error1)
        }
        else {
          console.log(profile[0])
          setProfile(profile[0])
        }
      }
    }

    fetchData()
  }, []);

  // const [profilePicture, setProfilePicture] = useState('')
  // const [name, setName] = useState('')

  // useEffect(() => {
  //   setProfilePicture(localStorage.getItem('profile_picture_url'))
  //   setName(localStorage.getItem('name'))
  // }, [])


  function goToMyProfile(e) {
    e.preventDefault()
    history.push('/my-profile')
  }

  return (
    <NavItem style={{
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none'
    }} onClick={(e) => goToMyProfile(e)}>
      <NavLink href="/my-profile" tag={NavLink} className="text-nowrap px-3" style={{ cursor: 'pointer' }}>
        <img
          className="user-avatar rounded-circle mr-2"
          src={`${process.env.REACT_APP_MEDIA_URL}${profile.avatar_url}`}
          width={50}
          height={40}
          style={{
            border: 'none',
            objectFit: 'cover'
          }}
        />{" "}
        <span
          className="d-none d-md-inline-block font-weight-bold"

        >{profile.name}</span>
      </NavLink>
    </NavItem>
  );
}

export default UserActions
