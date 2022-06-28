import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import supabase from "../utils/supabase";
import axios from 'axios';
import Loading from '../components/Loading/Loading'

const CreateProfile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('dm');
  const [dm, setDm] = useState('');
  const [zm, setZm] = useState('');
  const [allDms, setAllDms] = useState([]);
  const [allZms, setAllZms] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [isLocationDisable, setIsLocationDisable] = useState(true);
  const [isDmDisable, setIsDmDisable] = useState(true);
  const [isZmDisable, setIsZmDisable] = useState(true);
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentPath, setAttachmentPath] = useState('');
  const [loading, setLoading] = useState(true)
  const [dateJoined, setDateJoined] = useState('')

  const history = useHistory()

  useEffect(() => {
    allDivisions()
    setIsLocationDisable(false)
  }, [])

  
  useEffect(() => {
    async function fetchDmData() {
      // get Profile
      let { data: dms, error1 } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'dm')
      setAllDms(dms)
      setLoading(false)
      if ((role === 'zsm' || role === 'tso' || role === 'sr') && dms.length > 0) {
        // Zones
        let { data: zones, error2 } = await supabase
          .from('locations')
          .select('*')
          .eq('type', 'Zone')
          .eq('falls_under', dms[0].works_at)
        if (error2) {
          console.log(error2)
          setLocation('')
        } else {
          if (zones.length > 0) {
            setLocation(zones[0].id)
          }
          setAllLocations(zones)
          console.log(zones);
        }
      }
      // get ZMs
      if (dms.length > 0) {
        setDm(dms[0].id)
        let { data: zms, error3 } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'zsm')
          .eq('works_under', dms[0].id)
        setAllZms(zms)
        // allZones(dms[0].id)
        console.log(zms)
        // get territories
        if (role === 'tso' || role === 'sr' && zms.length > 0) {
          setZm(zms[0].id)
          let { data: territories, error } = await supabase
            .from('locations')
            .select('*')
            .eq('type', 'Territory')
            .eq('falls_under', zms[0].works_at)
          if (error) {
            console.log(error)
            setLocation('')
          } else {
            if (territories.length > 0) {
              console.log(territories, '<--------- got territories here!')
              setLocation(territories[0].id)
            }
            setAllLocations(territories)
            console.log(territories);
          }
        }
      }
      
      
    }
    fetchDmData()
  }, [role]);

  useEffect(()=>{
    if (allZms.length > 0){
      allTerritories(allZms[0]['id'])
    }
  }, [])


  // Location - get all Zones
  async function fetchZmData(dm_id) {
    let { data: zms, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'zsm')
      .eq('works_under', dm_id)
    setAllZms(zms)
    console.log(zms)
    if (!isZmDisable && zms.length > 0) {
      setZm(zms[0].id)
    }
  }
  async function allZones(dm_id) {
    // console.log(allDms, '<--------this is all dms')
    // console.log(dm_id, '<---------- this is dm id')
    let division_id = allDms.filter(dm => {
      return dm.id === dm_id
    })
    console.log(division_id)
    console.log(division_id[0].works_at);

    let { data: zones, error } = await supabase
      .from('locations')
      .select('*')
      .eq('type', 'Zone')
      .eq('falls_under', division_id[0].works_at)
    if (error) {
      console.log(error)
      setLocation('')
    } else {
      if (zones.length > 0) {
        setLocation(zones[0].id)
      }
      setAllLocations(zones)
      console.log(zones);
    }
  }

  function handleDmOnChange(e) {
    //console.log("JUST CHANGED THE VALUE OF DM")
    fetchZmData(e.target.value)
    setDm(e.target.value)
    allZones(e.target.value)
    console.log(e.target.value, '<------ this is e dot target dot value')
    console.log(allZms, '<--------- this is the current zm list')
    // allTerritories(zm['id'])
  }


  // Location - get all Territories
  async function allTerritories(zm_id) {
    let zone_id = allZms.filter(zm => {
      return zm.id === zm_id
    })
    console.log(zone_id[0].works_at);

    let { data: territories, error } = await supabase
      .from('locations')
      .select('*')
      .eq('type', 'Territory')
      .eq('falls_under', zone_id[0].works_at)
    if (error) {
      console.log(error)
      setLocation('')
    } else {
      if (territories.length > 0) {
        setLocation(territories[0].id)
      }
      setAllLocations(territories)
      console.log(territories);
    }
  }

  function handleZmOnChange(e) {
    setZm(e.target.value)
    allTerritories(e.target.value)
  }


  // Location - get all Divisions
  async function allDivisions() {
    let { data: divisions, error } = await supabase
      .from('locations')
      .select('*')
      .eq('type', 'Division')
    if (error) {
      console.log(error)
      setLocation('')
    } else {
      if (divisions.length > 0) {
        setLocation(divisions[0].id)
      }
      setAllLocations(divisions)
      console.log(divisions);
    }
  }


  function handleRoleOnChange(e) {
    console.log(e.target.value)

    if (e.target.value === 'chairman' || e.target.value === 'im' || e.target.value === 'am' || e.target.value === 'dm') {
      setRole(e.target.value)
      setIsDmDisable(true)
      setIsZmDisable(true)
      setIsLocationDisable(true)
      console.log(e.target.value);
    } else if (e.target.value === 'zsm') {
      setIsLocationDisable(false)
      setIsDmDisable(false)
      setIsZmDisable(true)
      setRole(e.target.value)
      console.log('zsm', e.target.value);
    }
    else if (e.target.value === 'tso' || e.target.value === 'sr') {
      setRole(e.target.value)
      setIsLocationDisable(false)
      setIsDmDisable(false)
      setIsZmDisable(false)
      console.log('tso/sr', e.target.value);
    }

    if (e.target.value === 'dm') {
      allDivisions()
      setIsLocationDisable(false)
    }
  }


  // Profile Picture
  const uploadPicture = async (event) => {
    try {
      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      let user = supabase.auth.user()
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `a1jg6w_0/${user.id}${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('profiles-pictures')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      setProfilePicture(filePath)
      console.log(filePath)

    } catch (error) {
      alert(error.message)
    }
  }

  const uploadDocument = async (event) => {
    try {
      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      let user = supabase.auth.user()
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = file.name.split('.')[0]
      const filePath = `flreew_0/${file.name}${Math.random()}.${fileExt}`

      let { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      setAttachmentName(fileName)
      setAttachmentPath(filePath)

    } catch (error) {
      alert(error.message)
    }
  }

  async function submitData(e) {
    e.preventDefault()
    // setLoading(true)
    if (name !== '' && email !== '' && password !== '' && role !== '' && age !== '') {

      // Auth
      // const data = localStorage.getItem('supabase.auth.token')
      // const current_name = localStorage.getItem('name')
      // const avatar_url = localStorage.getItem('avatar_url')
      console.log(email + '@wenerbd.com', '<------- this is the mail format')
      let user_id = {}
      setLoading(true)
      try{
        let user_id = await axios.post('https://JubilantObviousDebuggers.yourboimti.repl.co/', {
          email: email + '@wenerbd.com',
          password: password,
          role:role
        })
      user_id = user_id.data.user_id

      // Create User Function
      if (role === 'zsm') {
        if (dm !== '' && location !== '') {
          // user = supabase.auth.user()
          const { profile, error2 } = await supabase
            .from('profiles')
            .insert([
              { id: user_id, name: name, works_under: dm, role: role, works_at: location, age: age, avatar_url: profilePicture, phone_number: phoneNumber, attachment_path: attachmentPath, joined_date: dateJoined },
            ])
          if (error2) {
            console.log(error2)
          }
          else {
            console.log(profile);
            // localStorage.setItem('supabase.auth.token', data)
            // localStorage.setItem('name', current_name)
            // localStorage.setItem('avatar_url', avatar_url)
            //window.location.reload(false);
            history.push('/profiles')
          }
        }
      } else if (role === 'tso') {
        if (zm !== '' && dm !== '' && location !== '') {
          // user = supabase.auth.user()
          const { profile, error3 } = await supabase
            .from('profiles')
            .insert([
              {
                id: user_id, name: name, works_under: zm, role: role, works_at: location, age: age, avatar_url: profilePicture, phone_number: phoneNumber, attachment_path: attachmentPath, joined_date: dateJoined
              },
            ])
          if (error3) {
            console.log(error3)
          }
          else {
            console.log(profile);
            // localStorage.setItem('supabase.auth.token', data)
            // localStorage.setItem('name', current_name)
            // localStorage.setItem('avatar_url', avatar_url)
            history.push('/profiles')
            //window.location.reload(false);

          }
        }
      }
      else if (role === 'sr') {
        if (zm !== '' && dm !== '' && location !== '') {
          // user = supabase.auth.user()
          const { profile, error3 } = await supabase
            .from('profiles')
            .insert([
              {
                id: user_id, name: name, works_under: zm, role: role, works_at: location, age: age, avatar_url: profilePicture, phone_number: phoneNumber, attachment_path: attachmentPath, joined_date: dateJoined
              },
            ])
          if (error3) {
            console.log(error3)
          }
          else {
            console.log(profile);
            // localStorage.setItem('supabase.auth.token', data)
            // localStorage.setItem('name', current_name)
            // localStorage.setItem('avatar_url', avatar_url)
            history.push('/profiles')
            //window.location.reload(false);

          }
        }
      }
      else if (role === 'dm') {
        console.log(user_id, 'this is user_id')
        if (location !== '') {
          // user = supabase.auth.user()
          console.log(location, 'works at')
          const { profile, error4 } = await supabase
            .from('profiles')
            .insert([
              {
                id: user_id, name: name, role: role, works_at: location, age: age, avatar_url: profilePicture, phone_number: phoneNumber, attachment_path: attachmentPath, joined_date: dateJoined
              },
            ])
          if (error4) {
            console.log(error4, 'error after supabase')
          }
          else {
            console.log(profile, 'profile after supabase');
            // localStorage.setItem('supabase.auth.token', data)
            // localStorage.setItem('name', current_name)
            // localStorage.setItem('avatar_url', avatar_url)
            history.push('/profiles')
            //window.location.reload(false);

          }
        }
      } else if (role === 'chairman' || role === 'im' || role === 'am') {
        const { profile, error5 } = await supabase
          .from('profiles')
          .insert([
            {
              id: user_id, name: name, role: role, age: age, avatar_url: profilePicture, attachment_path: attachmentPath, phone_number: phoneNumber, joined_date: dateJoined
            },
          ])
        if (error5) {
          console.log(error5)
        }
        else {
          console.log(profile);
          // localStorage.setItem('supabase.auth.token', data)
          // localStorage.setItem('name', current_name)
          // localStorage.setItem('avatar_url', avatar_url)
          history.push('/profiles')
          // window.location.reload(false);
        }
      }
      const {res, err6} = await supabase.from('passwords').insert([{
          profile:user_id,
          password:password,
          username:email.split('@')[0]
    }])
      
    } catch (err){
      setLoading(false)
      alert("There was an error with account creation. Please check username and other fields. (any username can only be used once)")
    }

    } else {
      alert('Incomplete form')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Loading></Loading>
    )
  }

  return (
    <Container fluid className="main-content-container px-4 pb-5">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="12" title="Create a Profile" subtitle="Profile" className="text-sm-left" />
      </Row>

      <Row>
        <Col lg="8" className="mb-6">
          <Card small>

            <ListGroup flush>
              <ListGroupItem className="p-4">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feEmailAddress">Username</label>
                          <FormInput
                            id="feEmailAddress"
                            type="text"
                            placeholder="Username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Col>
                        <Col md="6" className='mb-2'>
                          <label htmlFor="fePassword">Password</label>
                          <FormInput
                            id="fePassword"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <FormGroup>
                        <label htmlFor="feInputName">Full Name</label>
                        <FormInput
                          id="feInputName"
                          placeholder="Enter full name"
                          type='name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Phone Number</label>
                        <FormInput
                          id="feInputName"
                          placeholder="Enter phone number"
                          type='name'
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Profile Picture</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadPicture(e)}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {profilePicture ? profilePicture : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="feInputName">Add Employee Credentials</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e)}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {attachmentName ? attachmentName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>

                      <Row form>
                        <Col md="6" className="form-group">
                          <label htmlFor="feInputState">Role</label>
                          <FormSelect
                            id="feInputState"
                            value={role}
                            onChange={(e) => {
                              setLocation('')
                              handleRoleOnChange(e)
                            }}
                          >
                            <option value='dm'>Divisional Manager</option>
                            <option value='zsm'>Zonal Sales Manager</option>
                            <option value='tso'>Territory Sales Officer</option>
                            <option value='sr'>Sales Representative</option>
                          </FormSelect>
                        </Col>


                        <Col md="6" className="form-group">
                          <label htmlFor="feInputState">DM</label>
                          <FormSelect
                            id="feInputState"
                            value={dm}
                            onChange={(e) => {
                              handleDmOnChange(e)
                              console.log(e.target.value);
                            }}
                            disabled={isDmDisable}
                          >
                            {allDms ? allDms.map(data => (
                              <option key={data.id} value={data.id}>{data.name}</option>
                            )) : null}
                          </FormSelect>
                        </Col>


                        <Col md="6" className="form-group">
                          <label htmlFor="feInputState">ZM</label>
                          <FormSelect
                            id="feInputState"
                            value={zm}
                            onChange={(e) => handleZmOnChange(e)}
                            disabled={isZmDisable}
                          >
                            {allZms ? allZms.map(data => (
                              <option key={data.id} value={data.id}>{data.name}</option>
                            )) : null}
                          </FormSelect>
                        </Col>
                        <Col md="6" className='mb-2'>
                          <label htmlFor="feAge">Age</label>
                          <FormInput
                            id="feAge"
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <FormGroup>
                        <label htmlFor="feInputLocation">Location</label>
                        <FormSelect
                          id="feInputState"
                          placeholder=""
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          disabled={isLocationDisable}
                        >
                          {allLocations ? allLocations.map(data => (
                            <option key={data.id} value={data.id}>{data.name}</option>
                          )) : null}
                        </FormSelect>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Date Joined</label>
                        <FormInput
                          id="feInputName"
                          placeholder="Enter joining date"
                          type='name'
                          value={dateJoined}
                          onChange={(e) => setDateJoined(e.target.value)}
                        />
                      </FormGroup>
                      <Button
                        type="button"
                        onClick={(e) => submitData(e)}
                        className='my-2 '>Create New Account</Button>
                    </Form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container >
  )
};

export default CreateProfile;