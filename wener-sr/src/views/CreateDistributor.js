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
import Loading from "../components/Loading/Loading";


const CreateDistributor = () => {
  const [profile, setProfile] = useState({});
  const [territoryId, setTerritoryId] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [divisionId, setDivisionId] = useState('');

  const [businessName, setBusinessName] = useState('');
  const [proprietorName, setProprietorName] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessType, setBusinessType] = useState('A');
  
  //documents
  const [photoPath, setPhotoPath] = useState(null)
  const [photoName, setPhotoName] = useState('')
  const [applicationPath, setApplicationPath] = useState(null)
  const [applicationName, setApplicationName] = useState('')
  const [deedPath, setDeedPath] = useState(null)
  const [deedName, setDeedName] = useState('')
  const [tinPath, setTinPath] = useState(null)
  const [tinName, setTinName] = useState('')
  const [nidPath, setNidPath] = useState(null)
  const [nidName, setNidName] = useState('')
  const [tradeLicensePath, setTradeLicensePath] = useState(null)
  const [tradeLicenseName, setTradeLicenseName] = useState('')
  const [salvageCertificatePath, setsalvageCertificatePath] = useState(null)
  const [salvageCertificateName, setsalvageCertificateName] = useState('')
  const [bankStatementPath, setBankStatementPath] = useState(null)
  const [bankStatementName, setBankStatementName] = useState('')
  const [agreementPath, setAgreementPath] = useState(null)
  const [agreementName, setAgreementName] = useState('')
  const [chequePath, setChequePath] = useState(null)
  const [chequeName, setChequeName] = useState('') 
  const [loading, setLoading] = useState(true)

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
        setProfile(profile[0])
      }

      let { data: territory, error2 } = await supabase
        .from('locations')
        .select("*")
        .eq('id', profile[0].works_at)
      if (error2) {
        console.log(error2)
      }
      else {
        setLoading(false)

        //console.log(territory, 'territory')
        setTerritoryId(territory[0]['id'])
      }

      let { data: zone, error3 } = await supabase
        .from('locations')
        .select("*")
        .eq('id', territory[0].falls_under)
      if (error3) {
        console.log(error3)
      }
      else {
        setLoading(false)

        //console.log(zone, 'zone')
        setZoneId(zone[0]['id'])
        setDivisionId(zone[0]['falls_under'])
      }


      // console.log(division, 'the zone is')
      // let { data: division, error4 } = await supabase
      //   .from('locations')
      //   .select("*")
      //   .eq('id', zone[0].falls_under)
      // if (error4) {
      //   console.log(error4)
      // }
      // else {
      //   console.log(division)
      // }
    }
    fetchData()
  }, []);

  async function handleClick(event) {
    event.preventDefault()

    // console.log([
    //   { name: name, address: address, phone: phoneNumber, business_type: businessType, territory_id: territoryId, zone_id: zoneId, division_id: divisionId, nid_path:nidPath, trade_license_path:tradeLicensePath },
    // ], 'sending this data')

    const { data, error } = await supabase
      .from('distributors')
      .insert([
        { business_name: businessName, proprietor_name:proprietorName, present_address: presentAddress, permanent_address: permanentAddress , phone: phoneNumber, business_type: businessType, territory_id: territoryId, zone_id: zoneId, division_id: divisionId, picture_path:photoPath, application_path:applicationPath, deed_path:deedPath, nid_path:nidPath, trade_license_path:tradeLicensePath, salvage_certificate_path:salvageCertificatePath, bank_statement_path:bankStatementPath, agreement_path:agreementPath, cheque_path:chequePath },
      ])
    if (error) {
      console.log(error)
    }
    else {
      console.log(data)
      history.push('/distributors')
    }
  }


  const uploadDocument = async (event, documentType) => {
    try {
      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      const user = supabase.auth.user()
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

      if (documentType == 'photo'){
        setPhotoName(fileName)
        setPhotoPath(filePath)
      }

      if (documentType == 'application'){
        setApplicationName(fileName)
        setApplicationPath(filePath)
      }

      if (documentType == 'deed'){
        setDeedName(fileName)
        setDeedPath(filePath)
      }

      if (documentType == 'tin'){
        setTinName(fileName)
        setTinPath(filePath)
      }

      if (documentType == 'nid'){
        setNidName(fileName)
        setNidPath(filePath)
      }

      if (documentType == 'tradeLicense'){
        setTradeLicenseName(fileName)
        setTradeLicensePath(filePath)
      }

      if (documentType == 'salvageCertificate'){
        setsalvageCertificateName(fileName)
        setsalvageCertificatePath(filePath)
      }

      if (documentType == 'bankStatement'){
        setBankStatementName(fileName)
        setBankStatementPath(filePath)
      }

      if (documentType == 'agreement'){
        setAgreementName(fileName)
        setAgreementPath(filePath)
      }      

      if (documentType == 'cheque'){
        setChequeName(fileName)
        setChequePath(filePath)
      }

    } catch (error) {
      alert(error.message)
    }
  }

  // name, address, phone number, business type (dropdown: electric, furniture)

  if (loading) {
    return <Loading></Loading>
  }


  return (
    <Container fluid className="main-content-container px-4 pb-5">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="12" title="Create a Dealer" subtitle="Dealers" className="text-sm-left" />
      </Row>

      <Row>
        <Col lg="8" className="mb-6">
          <Card small>

            <ListGroup flush>
              <ListGroupItem className="p-4">
                <Row>
                  <Col>
                    <Form>
                    <FormGroup>
                        <label htmlFor="feInputName">Business Name</label>
                        <FormInput
                          id="feInputName"
                          placeholder="Enter business's name"
                          type='text'
                          value={businessName}
                          onChange={(e) => { setBusinessName(e.target.value) }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Proprietor's Name</label>
                        <FormInput
                          id="feInputName"
                          placeholder="Enter proprietor's name"
                          type='text'
                          value={proprietorName}
                          onChange={(e) => { setProprietorName(e.target.value) }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputAddress">Present Address</label>
                        <FormInput id="feInputAddress" placeholder="Enter dealer's present address" value={presentAddress} onChange={(e) => { setPresentAddress(e.target.value) }} />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputAddress">Permanent Address</label>
                        <FormInput id="feInputAddress" placeholder="Enter dealer's parmanent address" value={permanentAddress} onChange={(e) => { setPermanentAddress(e.target.value) }} />
                      </FormGroup>

                      <Row form>
                        <Col md="8" className="form-group">

                          <label htmlFor="feInputTel">Phone Number</label>
                          <FormInput id="feInputTel" placeholder="Enter dealer's phone number" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="feInputState">Business Category</label>
                          <FormSelect id="feInputState" value={businessType} onChange={(e) => setBusinessType(e.target.value)}>
                            <option style={{ height: '20px' }} value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </FormSelect>
                        </Col>
                      </Row>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Picture</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e, 'photo')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {photoName ? photoName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Application</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e, 'application')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {applicationName ? applicationName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Deed</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e, 'deed')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {deedName ? deedName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload TIN</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e, 'tin')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {tinName ? tinName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload NID</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e, 'nid')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {nidName ? nidName : 'Choose file...'}
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
                            onChange={(e) => uploadDocument(e, 'tradeLicense')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {tradeLicenseName ? tradeLicenseName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Solvency Certificate</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e, 'salvageCertificate')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {salvageCertificateName ? salvageCertificateName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Bank Statement</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e, 'bankStatement')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {bankStatementName ? bankStatementName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Agreement</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e, 'agreement')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {agreementName ? agreementName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Cheque</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={(e) => uploadDocument(e, 'cheque')}
                          // value={profilePicture}
                          />
                          <label className="custom-file-label" htmlFor="customFile2">
                            {chequeName ? chequeName : 'Choose file...'}
                          </label>
                        </div>
                      </FormGroup>
                      <Button type="submit" className='mb-2' onClick={handleClick}>Create Dealer</Button>
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
