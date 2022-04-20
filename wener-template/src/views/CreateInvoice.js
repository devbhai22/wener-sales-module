import React, { useEffect, useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button,
  Container, Card, CardHeader, CardBody
} from "shards-react";
import CompleteFormExample from "../components/components-overview/CompleteFormExample";
import PageTitle from "../components/common/PageTitle";
import { functions } from "lodash";

const CreateInvoice = () => {
  const [inputs, setInputs] = useState([{}]);
  const [grossTotal, setGrossTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [netTotal, setNetTotal] = useState(0);



  function addInput(e) {
    e.preventDefault()
    setInputs([...inputs, {}])
    console.log(inputs);
  }


  function handleProductNameChange(e, index) {
    inputs[index].productName = e.target.value
    setInputs(inputs)
    console.log(inputs);
  }
  function handleQuantityChange(e, index) {
    inputs[index].quantity = parseInt(e.target.value)
    if (typeof (inputs[index].rate) != undefined && typeof (inputs[index].quantity) != undefined) {
      inputs[index].totalAmount = inputs[index].rate * inputs[index].quantity;
    }
    setInputs(inputs)
    console.log(inputs);
  }
  function handleRateChange(e, index) {
    inputs[index].rate = parseInt(e.target.value)
    if (typeof (inputs[index].rate) != undefined && typeof (inputs[index].quantity) != undefined) {
      inputs[index].totalAmount = inputs[index].rate * inputs[index].quantity;
    }
    setInputs(inputs)
    console.log(inputs);
  }
  // function handleAmountChange(e, index) {

  //     setInputs(inputs)
  //     console.log(inputs);
  //   }
  // }
  function handleGrossTotal(e) {
    e.preventDefault()
    let total = 1;
    for (let i = 0; i < inputs.length; i++) {
      total = total * parseInt(inputs[i].totalAmount);
    }
    setGrossTotal(total)
    console.log(total);
  }

  function handleNetTotal(e) {
    e.preventDefault()
    let total = grossTotal - discount;
    setNetTotal(total)
    console.log(total);
  }



  function removeInput(e) {
    e.preventDefault()
    inputs.splice(inputs.length - 1, 1)
    setInputs([...inputs])
    console.log(inputs);
  }
  useEffect(() => {
    console.log('helllo', inputs);
    setInputs(inputs)
  }, [inputs, handleQuantityChange, handleRateChange]);

  return (
    <Container fluid className="main-content-container px-4 pb-5">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="12" title="Create Invoice" subtitle="Blog Posts" className="text-sm-left" />
      </Row>

      <Row>
        <Col lg="10" className="mb-6">
          <Card small>
            <ListGroup flush>
              <ListGroupItem className="p-4">
                <Row>
                  <Col>
                    <Form>
                      <Row form>
                        <Col md="12" className="form-group">
                          <label htmlFor="feInputState">Choose Distributor</label>
                          <FormSelect id="feInputState">
                            <option>Anyones Name</option>
                            <option>Someones Name</option>
                          </FormSelect>
                        </Col>
                      </Row>

                      {/* product name, quantity, rate, Total Amount */}
                      <Row form className='mt-1' style={{ alignItems: 'flex-end' }}>
                        {inputs.length > 1 ? (
                          <Col md="12" style={{
                            borderTop: '1px solid #d1d1d1',
                            margin: '15px 0'
                          }}></Col>
                        ) : null}
                        {
                          inputs.map((input, index) => {
                            return (
                              <>
                                {index > 0 ? (
                                  <Col md="12" style={{
                                    borderTop: '1px solid #d1d1d1',
                                    margin: '15px 0'
                                  }}></Col>
                                ) : null}

                                <Col md="5"
                                  sm={7} xs={8}
                                  className="form-group">
                                  <label htmlFor="feEmailAddress">Product Name</label>
                                  <FormInput
                                    id="feName"
                                    type="name"
                                    placeholder="Product Name"
                                    onChange={(e) => handleProductNameChange(e, index)}
                                  />
                                </Col>
                                <Col md="2"
                                  sm={4} xs={4}
                                  className="form-group">
                                  <label htmlFor="feInputZip">Quantity</label>
                                  <FormInput
                                    id="feInputZip"
                                    onChange={(e) => handleQuantityChange(e, index)}
                                  />
                                </Col>
                                <Col md="2" sm={4} xs={5} className="form-group">
                                  <label htmlFor="feInputZip">Rate</label>
                                  <FormInput
                                    id="feInputZip"
                                    onChange={(e) => handleRateChange(e, index)}
                                  />
                                </Col>
                                <Col md="2" sm={4} xs={5} className="form-group">
                                  <label htmlFor="feInputZip">Total Amount</label>
                                  <FormInput
                                    id="feInputZip"
                                    value={input.totalAmount || 0}
                                  />
                                </Col>
                              </>
                            )
                          })
                        }

                        {/* <div style={{ display: 'flex', flexDirection: 'column' }}> */}
                        {inputs.length > 1 ? (
                          <button
                            className="btn btn-secondary me-1"
                            style={{
                              padding: 0,
                              height: '33px',
                              width: '33px',
                              borderRadius: '99%',
                              marginBottom: '18px'
                            }}
                            onClick={(e) => removeInput(e)}
                          >
                            <i className="fa fa-minus" aria-hidden="true"></i>
                          </button>

                        ) : null}
                        <button
                          className="btn btn-secondary"
                          style={{
                            padding: 0,
                            height: '33px',
                            width: '33px',
                            borderRadius: '99%',
                            marginBottom: '18px'
                          }}
                          onClick={(e) => addInput(e)}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        {/* </div> */}

                        {inputs.length > 1 ? (
                          <Col md="12" style={{
                            borderTop: '1px solid #d1d1d1',
                            margin: '15px 0'
                          }}></Col>
                        ) : null}
                      </Row>

                      <button onClick={(e) => handleGrossTotal(e)}>See Gross Total</button>
                      <p>{grossTotal}</p>
                      <label htmlFor="feEmailAddress">Discount</label>
                      <FormInput
                        id="feName"
                        type="number"
                        placeholder="Discount"
                        onChange={(e) => setDiscount(e.target.value)}
                      />
                      <button type="button" onClick={(e) => handleNetTotal(e)}>See Net Total</button>

                      <p>{netTotal}</p>
                      <Button type="submit" className='mt-2'>Create Invoice</Button>
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

export default CreateInvoice;