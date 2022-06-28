import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import supabase from '../utils/supabase'
import DistributorDetailsCard from './DistributorsDetailsCard';

const DistributorDetails = ({ match }) => {

    useEffect(() => {
        console.log(match.params.id);
    }, [match]);


    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    title="View Details"
                    subtitle="Dealers"
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
                    <DistributorDetailsCard id={match.params.id} />
                </Col>
            </Row>
        </Container>
    );
};

export default DistributorDetails;
