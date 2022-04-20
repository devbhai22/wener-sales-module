import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import CompleteFormExample from "../components-overview/CompleteFormExample";
import PageTitle from "../components/common/PageTitle";

const CreateDistributor = () => (
    <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
            <PageTitle sm="12" title="Add New Post" subtitle="Blog Posts" className="text-sm-left" />
        </Row>

        <Row>
            <Col lg="6" className="mb-4">
                <Card small>
                    <CardHeader className="border-bottom">
                        <h6 className="m-0">Form Example</h6>
                    </CardHeader>
                    <CompleteFormExample />
                </Card>
            </Col>
        </Row>
    </Container>
);

export default CreateDistributor;