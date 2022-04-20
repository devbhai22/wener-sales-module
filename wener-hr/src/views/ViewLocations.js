import React, { useEffect } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import DivisionLocation from "../components/Table/DivisionLocation";
import TerritoryLocation from "../components/Table/TerritoryLocation";
import ZoneLocation from "../components/Table/ZoneLocation";


const ViewLocations = ({ match }) => {

    useEffect(() => {
        console.log(match.params.id);
    }, [match]);


    return (
        <Container fluid className="main-content-container">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    title="Divisions"
                    subtitle="Overview"
                    xm="12"
                    className="ml-sm-auto mr-sm-auto"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'center'
                    }}
                />
            </Row>
            <Row style={{ justifyContent: 'center' }} className='mb-3'>
                <Col lg="10" >
                    <DivisionLocation></DivisionLocation>
                </Col>
                <Col lg="10">
                    <Row noGutters className="page-header py-4">
                        <PageTitle
                            title="Zones"
                            subtitle="Overview"
                            xm="12"
                            className="ml-sm-auto mr-sm-auto"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'center'
                            }}
                        />
                    </Row>
                    <ZoneLocation></ZoneLocation>
                </Col>
                <Col lg="10">
                    <Row noGutters className="page-header py-4">
                        <PageTitle
                            title="Territories"
                            subtitle="Overview"
                            xm="12"
                            className="ml-sm-auto mr-sm-auto"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'center'
                            }}
                        />
                    </Row>
                    <TerritoryLocation></TerritoryLocation>
                </Col>

            </Row>
        </Container>
    )
};

export default ViewLocations;
