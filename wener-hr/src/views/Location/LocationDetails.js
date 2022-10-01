import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, CardHeader, FormGroup, FormInput, Button, FormSelect} from "shards-react";

import PageTitle from "../components/common/PageTitle";
import supabase from "../utils/supabase";
import SingleProfileTable from "./SingleProfileTable";
import SingleProfileUser from "./SingleProfileUser";
import Loading from "../components/Loading/Loading";

const LocationDetails = ({ match }) => {
  const [user, setUser] = useState([]);
  const [location, setLocation] = useState([])
  const [zoneData, setZoneData] = useState([])
  const [divisionData, setDivisionData] = useState([])
  const [fallsUnder, setFallsUnder] = useState(location.falls_under_name)
  const [name, setName] = useState(location.name)

  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
        const { data, error } = await supabase
            .from('locations')
            .select('*')
            .eq("id", match.params.id)
            
            setLocation(data[0])
    }
    async function fetchZoneData() {
        const { data, error } = await supabase
            .from('locations')
            .select('*')
            .match({type: 'Zone'})
            
            setZoneData(data)
    }
    async function fetchDivisionData() {
        const { data, error } = await supabase
            .from('locations')
            .select('*')
            .eq('type', 'Division')
            
            setDivisionData(data)
    }

    fetchData()
    fetchDivisionData()
    fetchZoneData()
  }, []);

  async function updateData(e) {
    e.preventDefault()
    const { data, error } = await supabase
        .from('locations')
        .update({ name: name, falls_under_name: fallsUnder})
        .match({ id: location.id })

        history.push('/locations')
    }

  if (location == null) {
    return <Loading></Loading>
  }

else{
    console.log(fallsUnder)
    return (
        <>
        <Row noGutters className="page-header py-4" style = {{ marginLeft: '40%' }}>
                    <PageTitle sm="12" title="Location Details" className="text-sm-left" />
        </Row>
        <Card small className="d-flex flex-row justify-content-center" style={{ maxWidth: "500px", margin: '30%', paddingTop:50, paddingBottom:50, marginTop: 0, marginBottom: '20%' }}>
            <CardHeader className=" text-center">
                <span className="text-muted d-block">Location ID: {location.id}</span>
                <span className="text-muted d-block">Name: {location.name}</span>
                <span className="text-muted d-block">Falls Under: {location.falls_under_name}</span>
                <span className="text-muted d-block">Type: {location.type} </span>
                <FormGroup style = {{marginTop: 30}}>
                    <span className="text-muted d-block" style = {{marginBottom: 10}}> New name </span>
                    <FormInput
                        id="feInputName"
                        type='name'
                        placeholder = 'Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <span className="text-muted d-block" style = {{marginBottom: 10}}> Zone </span>
                    <FormSelect
                        id="feInputState"
                        value={fallsUnder}
                        onChange={(e) => setFallsUnder(e.target.value)}
                        disabled={location.type == 'Territory' ? false : true}
                        style = {{marginBottom: 20}}
                    >
                        <option value = {location.falls_under_name}></option>
                        {zoneData ? zoneData.map(data => (
                            <option key={data.id} value={data.name}>{data.name}</option>
                        )) : null}
                    </FormSelect>
                <span className="text-muted d-block" style = {{marginBottom: 10}}> Division </span>
                    <FormSelect
                        id="feInputState"
                        value={fallsUnder}
                        onChange={(e) => setFallsUnder(e.target.value)}
                        disabled={location.type == 'Zone'? false : true}
                        style = {{marginBottom: 40}}
                    >
                        <option value = {location.falls_under_name}></option>
                        {divisionData ? divisionData.map(data => (
                            <option key={data.id} value={data.name}>{data.name}</option>
                        )) : null}
                    </FormSelect>
                <Button
                    type="button"
                    onClick={(e) => updateData(e)}
                    style = {{marginTop: 10}}
                    >Update Location
                </Button>
            </CardHeader>
        </Card>
        </>
    )
    };
}
export default LocationDetails;