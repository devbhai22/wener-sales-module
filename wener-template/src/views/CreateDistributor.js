import React, { useState } from "react";
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

const CreateDistributor = () => {
  const [email, setEmail] = useState('');

  // name, address, phone number, business type (dropdown: electric, furniture)

  return (
    <Container fluid className="main-content-container px-4 pb-5">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="12" title="Create a Distributor" subtitle="Distributor" className="text-sm-left" />
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
                        <label htmlFor="feInputName">Full Name</label>
                        <FormInput
                          id="feInputName"
                          placeholder="Write your full name"
                          type='name'
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputAddress">Address</label>
                        <FormInput id="feInputAddress" placeholder="1234 Main St" />
                      </FormGroup>



                      <Row form>
                        <Col md="8" className="form-group">

                          <label htmlFor="feInputTel">Phone Number</label>
                          <FormInput id="feInputTel" placeholder="019********" />
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="feInputState">Business Type</label>
                          <FormSelect id="feInputState">
                            <option style={{ height: '20px' }}>Electric</option>
                            <option>Furniture</option>
                          </FormSelect>
                        </Col>
                      </Row>
                      <Button type="submit" className='mb-2'>Create New Account</Button>
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