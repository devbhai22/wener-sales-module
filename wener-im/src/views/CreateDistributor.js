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

const CreateDistributor = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [businessType, setBusinessType] = useState('electric')
  const [territoryList, setTerritoryList] = useState([])
  const [territoryId, setTerritoryId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [divisionId, setDivisionId] = useState('');
  const [nidPath, setNidPath] = useState('');
  const [tradeLicensePath, setTradeLicensePath] = useState('');

  const history = useHistory()
  const user = supabase.auth.user()

  useEffect(() => {
    async function fetchData() {
      let { data: profile, error1 } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)

      if (error1) {
        console.log(error1)
      }
      else {
        console.log(profile[0])
      }

      let { data: zone, error3 } = await supabase
        .from('locations')
        .select("*")
        .eq('id', profile[0].works_at)
      if (error3) {
        console.log(error3)
      }
      else {
        console.log(zone, 'zone')
        setZoneId(zone[0]['id'])
        setDivisionId(zone[0]['falls_under'])
      }

      let { data: territory, error2 } = await supabase
        .from('locations')
        .select("*")
        .eq('type', 'territory')
      if (error2) {
        console.log(error2)
      }
      else {
        console.log(error2)
        setTerritoryList(territory)
        setTerritoryId(territory[0]['id'])
      }

    }
    fetchData()
  }, []);


  async function handleTerritoryOnChange(e) {
    setTerritoryId(e.target.value)
  }


  async function handleClick(event) {
    event.preventDefault()

    console.log([
      { name: name, address: address, phone: phoneNumber, business_type: businessType, territory_id: territoryId, zone_id: zoneId, division_id: divisionId, nid_path: nidPath, trade_license_path: tradeLicensePath },
    ], 'sending this data')

    const { data, error } = await supabase
      .from('distributors')
      .insert([
        { name: name, address: address, phone: phoneNumber, business_type: businessType, territory_id: territoryId, zone_id: zoneId, division_id: divisionId, nid_path: nidPath, trade_license_path: tradeLicensePath },
      ])
    if (error) {
      console.log(error)
    }
    else {
      console.log(data)
      history.push('/distributors')
    }
  }


  const uploadNID = async (event) => {
    try {
      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      const user = supabase.auth.user()
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `flreew_0/${user.id}${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      setNidPath(filePath)
      console.log(filePath)

    } catch (error) {
      alert(error.message)
    }
  }

  const uploadTradeLicense = async (event) => {
    try {
      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      const user = supabase.auth.user()
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `flreew_0/${user.id}${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      setTradeLicensePath(filePath)
      console.log(filePath)

    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Container fluid className="main-content-container px-4 pb-5">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="12" title="Create a Distributor" subtitle="Distributors" className="text-sm-left" />
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
                        <Col md="12" className="form-group">
                          <label htmlFor="feInputState">Choose Territory</label>
                          <FormSelect
                            id="feInputState"
                            value={territoryId}
                            onChange={(e) => {
                              handleTerritoryOnChange(e)
                              console.log(e.target.value);
                            }}
                          >
                            {territoryList ? territoryList.map(territory => (
                              <option key={territory.id} value={territory.id}>{territory.name}</option>
                            )) : null}
                          </FormSelect>
                        </Col>

                      </Row>

                      <FormGroup>
                        <label htmlFor="feInputName">Name</label>
                        <FormInput
                          id="feInputName"
                          placeholder="Enter distributor's name"
                          type='name'
                          value={name}
                          onChange={(e) => { setName(e.target.value) }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputAddress">Address</label>
                        <FormInput id="feInputAddress" placeholder="Enter distributor's address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
                      </FormGroup>



                      <Row form>
                        <Col md="8" className="form-group">

                          <label htmlFor="feInputTel">Phone Number</label>
                          <FormInput id="feInputTel" placeholder="Enter distributor's phone number" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="feInputState">Business Type</label>
                          <FormSelect id="feInputState" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
                            <option style={{ height: '20px' }} value="electric">Electric</option>
                            <option value="furniture">Furniture</option>
                          </FormSelect>
                        </Col>
                      </Row>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload NID</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadNID(e)}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {nidPath ? nidPath : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Trade License</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadTradeLicense(e)}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {tradeLicensePath ? tradeLicensePath : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <Button type="submit" className='mb-2' onClick={handleClick}>Create New Account</Button>
                    </Form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default CreateDistributor;