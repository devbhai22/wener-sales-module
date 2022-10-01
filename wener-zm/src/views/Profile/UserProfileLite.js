import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";
import supabase from "../../utils/supabase";

const UserProfileLite = () => {
  const [profile, setProfile] = useState({})

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
    }
    fetchData()
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
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
        <Col lg="5" xs={11} sm={8}>

          <Card small className="mb-4 pt-4">
            <CardHeader className="border-bottom text-center pb-5">
              <div className="mb-3 mx-auto">
                <img
                  className="rounded-circle"

                  src={`${process.env.REACT_APP_MEDIA_URL}${profile.avatar_url}`}
                  alt={profile.name}
                  width="110"
                />
              </div>
              <h4 className="mb-0">{profile.name}</h4>
              <span className="text-muted d-block mt-3 " style={{ fontSize: '20px' }}>{`Role - ${profile.role}`}</span>
              <span className="text-muted d-block" style={{ fontSize: '20px' }}>{`${profile.age} years old`}</span>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};

export default UserProfileLite;
