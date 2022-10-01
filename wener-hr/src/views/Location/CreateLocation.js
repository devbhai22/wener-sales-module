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
    FormSelect,
    Button
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import supabase from "../../utils/supabase";
import Loading from "../../components/Loading/Loading"

const CreateProfile = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('Division');
    const [division, setDivision] = useState('');
    const [zone, setZone] = useState('');
    const [allDivisions, setAllDivisions] = useState([]);
    const [allZones, setAllZones] = useState([]);
    const [isDivisionDisable, setIsDivisionDisable] = useState(true);
    const [isZoneDisable, setIsZoneDisable] = useState(true);
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    // Zone datas
    async function fetchZoneData(division_id) {
        let { data: zones, error } = await supabase
            .from('locations')
            .select('*')
            .eq('type', 'Zone')
            .eq('falls_under', division_id)
        if (error) {
            console.log(error)
        } else {
            setAllZones(zones)
            console.log(zones)
            if (zones.length > 0) {
                setZone(zones[0].id)
            }
        }
    }
    // Division datas
    async function fetchDivisionData() {
        let { data: divisions, error } = await supabase
            .from('locations')
            .select('*')
            .eq('type', 'Division')
        if (error) {
            console.log(error)
        } else {
            setAllDivisions(divisions)
            console.log(divisions)
            if (divisions.length > 0) {
                setDivision(divisions[0].id)
                fetchZoneData(divisions[0].id)
            }
        }
    }

    function handleDivisionOnChange(e) {
        setDivision(e.target.value)
        fetchZoneData(e.target.value)
    }

    function handleTypeOnChange(e) {
        if (e.target.value === 'Division') {
            setType(e.target.value)
            setIsDivisionDisable(true)
            setIsZoneDisable(true)
            console.log(e.target.value);
        } else if (e.target.value === 'Zone') {
            fetchDivisionData()
            setIsDivisionDisable(false)
            setIsZoneDisable(true)
            setType(e.target.value)
            console.log('Zone', e.target.value);
        }
        else if (e.target.value === 'Territory') {
            fetchDivisionData()
            setType(e.target.value)
            setIsDivisionDisable(false)
            setIsZoneDisable(false)

            console.log('Territory', e.target.value);
        }
        setType(e.target.value)
    }


    // createLocation -- form submit function
    async function createDivision(divisionName) {
        let { data, error } = await supabase
            .from('locations')
            .insert([
                { type: 'Division', name: divisionName },
            ])
        if (error) {
            console.log(error)
            alert("Location creation failed")
        } else {
            console.log(data);
            history.push('locations')
        }
    }
    async function createZone(zoneName, divisionID) {
        let { data, error } = await supabase
            .from('locations')
            .insert([
                { type: 'Zone', name: zoneName, falls_under: divisionID },
            ])
        if (error) {
            console.log(error)
            alert("Location creation failed")
        } else {
            console.log(data);
            history.push('locations')
        }
    }
    async function createTerritory(territoryName, zoneID) {
        let { data, error } = await supabase
            .from('locations')
            .insert([
                { type: 'Territory', name: territoryName, falls_under: zoneID },
            ])
        if (error) {
            console.log(error)
            alert("Location creation failed")
        } else {
            console.log(data);
            history.push('locations')
        }
    }
    function createLocation(e) {
        e.preventDefault()

        if (type === 'Division') {
            createDivision(name)
        } else if (type === 'Zone') {
            createZone(name, division)
        } else if (type === 'Territory') {
            createTerritory(name, zone)
        }
    }

    // name, address, phone number, business type (dropdown: electric, furniture)
    if (loading){
        return (
            <Loading></Loading>
        )
    }
    return (
        <Container fluid className="main-content-container px-4 pb-5">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="12" title="Create a Location" subtitle="Location" className="text-sm-left" />
            </Row>

            <Row>
                <Col lg="8" className="mb-6">
                    <Card small>

                        <ListGroup flush>
                            <ListGroupItem className="p-4">
                                <Row>
                                    <Col>
                                        <Form >


                                            <Row form>
                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feInputState">Type</label>
                                                    <FormSelect
                                                        id="feInputState"
                                                        value={type}
                                                        onChange={(e) => {
                                                            handleTypeOnChange(e)
                                                            console.log(e.target.value);
                                                        }
                                                        }
                                                    >
                                                        <option>Division</option>
                                                        <option>Zone</option>
                                                        <option>Territory</option>
                                                    </FormSelect>
                                                </Col>


                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feInputState">Division</label>
                                                    <FormSelect
                                                        id="feInputState"
                                                        value={division}
                                                        onChange={(e) => {
                                                            handleDivisionOnChange(e)
                                                            console.log(e.target.value);
                                                        }}
                                                        disabled={isDivisionDisable}
                                                    >
                                                        {allDivisions ? allDivisions.map(data => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.name}
                                                            </option>
                                                        )) : null}
                                                    </FormSelect>
                                                </Col>


                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feInputState">Zone</label>
                                                    <FormSelect
                                                        id="feInputState"
                                                        value={zone}
                                                        onChange={(e) => setZone(e.target.value)}
                                                        disabled={isZoneDisable}
                                                    >
                                                        {allZones ? allZones.map(data => (
                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                        )) : null}
                                                    </FormSelect>
                                                </Col>
                                                <Col md="6" className='mb-2'>
                                                    <label htmlFor="feInputName">Name</label>
                                                    <FormInput
                                                        id="feInputName"
                                                        placeholder="Write location name"
                                                        type='name'
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </Col>
                                            </Row>
                                            <Button type="submit" className='my-2' onClick={(e) => createLocation(e)}>Create Location</Button>
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