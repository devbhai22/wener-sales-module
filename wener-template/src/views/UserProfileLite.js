import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";

const UserProfileLite = () => (
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
        <UserDetails />
      </Col>
    </Row>
  </Container>
);

export default UserProfileLite;
