import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../../components/common/PageTitle";
import supabase from "../../utils/supabase";
import SingleProfileTable from "./SingleProfileTable";
import SingleProfileUser from "./SingleProfileUser";
import Loading from "../../components/Loading/Loading";

const SingleProfile = ({ match }) => {
  const [user, setUser] = useState([]);
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      let { data: profile, error1 } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", match.params.id)
      if (error1) {
        console.log(error1)
      }
      else {
        setUser(profile)
        console.log(profile)
      }

      let { data: profiles, error2 } = await supabase
        .from('profiles').select('*')
        .eq("works_under", match.params.id)

      if (error2) {
        console.log(error2)
      }
      else {
        setLoading(false)
        setProfiles(profiles)
        console.log(profiles)
        console.log(match.params.id);
      }
    }

    fetchData()
  }, [match]);


  if (loading) {
    return <Loading></Loading>
  }


  return (
    <Container fluid className="main-content-container">
      <Row noGutters className="page-header py-4">
        <PageTitle
          title="User Profile"
          subtitle="Overview"
          md="12"
          className="ml-sm-auto mr-sm-auto"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        />
      </Row>
      <Row style={{ justifyContent: 'center' }} className='mb-3'>
        <Col lg="3" xs={11} sm={8}>
          <SingleProfileUser userDetails={user[0]} />
        </Col>
        <Col lg="9">
          <SingleProfileTable allProfiles={profiles}></SingleProfileTable>
        </Col>

      </Row>
    </Container>
  )
};

export default SingleProfile;
