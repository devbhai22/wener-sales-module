import React, { useEffect, useState } from "react";
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
import PageTitle from "../../components/common/PageTitle";
import { useHistory } from "react-router-dom";
import supabase from "../../utils/supabase";
import Loading from "../../components/Loading/Loading"


const EditProfile = ({ match }) => {
    const [authUser, setAuthUser] = useState({})
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('')
    const [profilePicture, setProfilePicture] = useState('');
    const [attachmentPath, setAttachmentPath] = useState('')
    const [location, setLocation] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('');
    const [dm, setDm] = useState('');
    const [zm, setZm] = useState('');
    const [allDms, setAllDms] = useState([]);
    const [allZms, setAllZms] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [isLocationDisable, setIsLocationDisable] = useState(true);
    const [isDmDisable, setIsDmDisable] = useState(true);
    const [isZmDisable, setIsZmDisable] = useState(true);
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [loading, setLoading] = useState(true)
    const [joinDate, setJoinDate] = useState('')

    const history = useHistory()

    // useEffect(()=> {
    //     let auth_user = supabase.auth.user()
    //     setAuthUser(auth_user)
    //     const fetchPassword = async() => {
    //         const {passwordObj, err} = await supabase.from('passwords').select('*').eq('profile', auth_user)
    //         if (err){
    //             console.log(err)
    //         } else {
    //             setPassword(passwordObj['password'])
    //             setUsername(passwordObj['username'])
    //         }
    //         console.log(passwordObj, '<------- this is pwd obj')
    //     }
    //     fetchPassword()
    // }, [])

    useEffect(() => {

        async function fetchDmData() {
            console.log(process.env);
            // get user infos
            let { data: profile, error1 } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", match.params.id)
            if (error1) {
                console.log(error1)
            }
            else {
                setUser(profile[0])
                setRole(profile[0].role)
                setAge(profile[0].age)
                setProfilePicture(profile[0].avatar_url)
                setName(profile[0].name)
                setPhoneNumber(profile[0].phone_number)
                setAttachmentPath(profile[0].attachment_path)
                setJoinDate(profile[0].joined_date)
                console.log(profile)
                setLoading(false)

                let { data: passwords, error } = await supabase
                    .from('passwords')
                    .select("*")
                    .eq("profile", match.params.id)

                console.log(passwords, '<-------- this is passwords')
                setPassword(passwords[0]['password'])
                setUsername(passwords[0]['username'])

                // console.log(match.params.id, '<------ this match params')
                // const {passwordObj, err} = await supabase
                //     .from('passwords')
                //     .select('*')
                //     .eq('profile', '55de950c-ac84-4e95-abe0-9f7ca71e162e')
                // if (err){
                //     console.log(err)
                // } else {
                //     console.log(passwordObj)
                //     setPassword(passwordObj[0]['password'])
                //     setUsername(passwordObj[0]['username'])
                // }  
                

                if (profile.length > 0) {
                    let { data, error2 } = await supabase
                        .from('locations')
                        .select('*')
                        .eq('id', profile[0].works_at)
                        setLocation(data[0].id)
                    if (error2) {
                        console.log(error2)
                        setLocation('')
                    } else {
                        let { data: location, error2 } = await supabase
                        .from('locations')
                        .select('*')
                        .eq('falls_under', data[0].falls_under)
                        if (error2) {
                            console.log(error2)
                            setLocation('')
                        } else{
                            try{
                                setAllLocations(location)
                                console.log(location, 'zones');
                            } catch (err){
                                console.log(err)
                            }
                        }
                    }
                }

                if (profile[0].role === 'zsm' && profile[0].works_under) {
                    let { data: DM, error5 } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('role', 'dm')
                        .eq('id', profile[0].works_under)
                    if (error5) {
                        console.log(error5)
                        setDm('')
                    } else {
                        setDm(DM[0].id)
                        console.log(DM)
                    }
                }

                if (profile[0].role === 'tso' ||  profile[0].role === 'sr' && profile[0].works_under) {
                    let { data: zms, error3 } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('role', 'zsm')
                        .eq('id', profile[0].works_under)
                    if (error3) {
                        console.log(error3)
                        setZm('')
                    } else {
                        setZm(zms[0].id)
                        console.log(zms)

                        let { data: dmForTso, error4 } = await supabase
                            .from('profiles')
                            .select('*')
                            .eq('role', 'dm')
                            .eq('id', zms[0].works_under)
                        if (error4) {
                            console.log(error4)
                            setDm('')
                        } else {
                            setDm(dmForTso[0].id)
                            console.log(dmForTso)
                        }
                    }
                }


            }

            let { data: dms, error6 } = await supabase
                .from('profiles')
                .select('*')
                .eq('role', 'dm')
            setAllDms(dms)
            if (dms.length > 0) {
                // setDm(dm ? dm : dms[0].id)

                if (profile[0].role === 'tso' || profile[0].role === 'sr') {
                    fetchZmData(dms[0].id)
                }
            }
            console.log(dms)
        }
        fetchDmData()
    }, [match]);

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
            // setZm(zm ? zm : zms[0].id)
        }
    }
    async function allZones(dm_id) {
        let division_id = allDms.filter(dm => {
            return dm.id === dm_id
        })
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
            console.log(zones, 'zones');
        }
    }
    function handleDmOnChange(e) {
        fetchZmData(e.target.value)
        setDm(e.target.value)
        allZones(e.target.value)
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
            console.log(territories, 'territories');
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
            setAllLocations(divisions)
            console.log(divisions, 'divisions');
            if (divisions.length > 0) {
                setLocation(divisions[0].id)
            }
        }
    }


    useEffect(() => {
        if (role !== '') {
            if (role === 'chairman' || role === 'im' || role === 'am' || role === 'dm') {
                setIsDmDisable(true)
                setIsZmDisable(true)
                setIsLocationDisable(true)
                console.log(role);
            } else if (role === 'zsm') {
                //allDivisions()
                setIsLocationDisable(false)
                setIsDmDisable(false)
                setIsZmDisable(true)
                console.log('zsm', role);
            }
            else if (role === 'tso' || role === 'sr') {
                //allDivisions()
                setIsLocationDisable(false)
                setIsDmDisable(false)
                setIsZmDisable(false)
                console.log('tso/sr', role);
            }

            if (role === 'dm') {
                allDivisions()
                setIsLocationDisable(false)
            }
        }

    }, [role]);


    // Profile Picture
    const uploadPicture = async (event) => {
        try {
            if (!event.target.files || event.target.files.length == 0) {
                throw 'You must select an image to upload.'
            }

            const user = supabase.auth.user()
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

    // Profile Picture
    const uploadDocument = async (event) => {
        try {
            if (!event.target.files || event.target.files.length == 0) {
                throw 'You must select an image to upload.'
            }

            const user = supabase.auth.user()
            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `a1jg6w_0/${file.name}${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            let { error: uploadError } = await supabase.storage
                .from('documents')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            setAttachmentPath(filePath)
            console.log(filePath)

        } catch (error) {
            alert(error.message)
        }
    }


    async function submitData(e) {
        e.preventDefault()
        if (name !== '') {


            // Create User Function
            if (role === 'zsm') {
                if (dm !== '' && location !== '') {
                    const { profile, error2 } = await supabase
                        .from('profiles')
                        .update({ name: name, works_under: dm, works_at: location, age: age, avatar_url: profilePicture, attachment_path: attachmentPath, phone_number:phoneNumber, location:location.name, joined_date:joinDate })
                        .eq('id', user.id)
                    if (error2) {
                        console.log(error2)
                    }
                    else {
                        console.log(profile);
                        history.push('/profiles')
                    }
                }
            } else if (role === 'tso') {
                if (zm !== '' && dm !== '' && location !== '') {
                    const { profile, error3 } = await supabase
                        .from('profiles')
                        .update({ name: name, works_under: zm, works_at: location, age: age, avatar_url: profilePicture, attachment_path: attachmentPath, phone_number:phoneNumber, location:location.name, joined_date:joinDate })
                        .eq('id', user.id)
                    if (error3) {
                        console.log(error3)
                    }
                    else {
                        console.log(profile);
                        history.push('/profiles')

                    }
                }
            }
            else if (role === 'sr') {
                if (zm !== '' && dm !== '' && location !== '') {
                    const { profile, error3 } = await supabase
                        .from('profiles')
                        .update({ name: name, works_under: zm, works_at: location, age: age, avatar_url: profilePicture, attachment_path: attachmentPath, phone_number:phoneNumber, location:location.name, joined_date:joinDate })
                        .eq('id', user.id)
                    if (error3) {
                        console.log(error3)
                    }
                    else {
                        console.log(profile);
                        history.push('/profiles')

                    }
                }
            }
            else if (role === 'dm') {
                if (location !== '') {
                    const { profile, error4 } = await supabase
                        .from('profiles')
                        .update({ name: name, works_at: location, age: age, avatar_url: profilePicture, attachment_path: attachmentPath, phone_number:phoneNumber, location:location.name, joined_date:joinDate })
                        .eq('id', user.id)
                    if (error4) {
                        console.log(error4)
                    }
                    else {
                        console.log(profile);
                        history.push('/profiles')

                    }
                }
            } else if (role === 'chairman' || role === 'im' || role === 'am' || role === 'hr') {
                console.log(user);
                const { profile, error5 } = await supabase
                    .from('profiles')
                    .update({ name: name, age: age, avatar_url: profilePicture, attachment_path:attachmentPath })
                    .eq('id', user.id)
                if (error5) {
                    console.log(error5)
                }
                else {
                    console.log(profile);
                    history.push('/profiles')
                }
            }

        }
        else {
            console.log('baal');
        }
    }

    if (loading) {
        return (
            <Loading></Loading>
        )
    }
    console.log(location)
    return (
        <Container fluid className="main-content-container px-4 pb-5">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="12" title="Edit Profile" subtitle="Profile" className="text-sm-left" />
            </Row>

            <Row>
                <Col lg="8" className="mb-6">
                    <Card small>

                        <ListGroup flush>
                            <ListGroupItem className="p-4">
                                <Row>
                                    <Col>
                                        <Form>
                                            <p><strong>Username:</strong> {username}</p>
                                            <p><strong>Password:</strong> {password}</p>
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
                                                <label htmlFor="feInputName">Join Date</label>
                                                <FormInput
                                                    id="feInputName"
                                                    placeholder="Enter join date"
                                                    type='name'
                                                    value={joinDate}
                                                    onChange={(e) => setJoinDate(e.target.value)}
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
                                                <label htmlFor="feInputName">Employment Credentials</label>
                                                <div className="custom-file">
                                                    <input
                                                        type="file"
                                                        className="custom-file-input"
                                                        id="customFile2"
                                                        onChange={(e) => uploadDocument(e)}
                                                    // value={profilePicture}
                                                    />
                                                    <label className="custom-file-label" htmlFor="customFile2">
                                                        {attachmentPath ? attachmentPath : 'Choose file...'}
                                                    </label>
                                                </div>
                                            </FormGroup>

                                            <Row form>
                                                <Col md="6" className="form-group">
                                                    <label htmlFor="feInputRole">Role</label>
                                                    <FormInput
                                                        id="feInputRole"
                                                        type='text'
                                                        value={role}
                                                        disabled
                                                    // onChange={(e) => setName(e.target.value)}
                                                    />
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
                                            <Button
                                                type="button"
                                                onClick={(e) => submitData(e)}
                                                className='my-2 '>Update Account</Button>

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

export default EditProfile;
