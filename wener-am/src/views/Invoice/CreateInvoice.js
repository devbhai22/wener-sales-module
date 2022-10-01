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
import CompleteFormExample from "../../components/components-overview/CompleteFormExample";
import PageTitle from "../../components/common/PageTitle";
import { functions } from "lodash";
import supabase from "../../utils/supabase";
import { useHistory } from "react-router-dom";

const CreateInvoice = () => {
  const [inputs, setInputs] = useState([{}]);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [defaultCredit, setDefaultCredit] = useState(0)
  const [credit, setCredit] = useState(0)
  const [creditLimit, setCreditLimit] = useState(0)
  const [distributorId, setDistributorId] = useState('');
  const [distributorName, setDistributorName] = useState('');
  const [distributorList, setDistributorList] = useState([])
  const [refresh, setRefresh] = useState('y');
  const [profile, setProfile] = useState({})

  const history = useHistory()
  const user = supabase.auth.user()



  useEffect(() => {
    async function fetchData() {

      let { data: profile, error1 } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', user.id)
      if (error1) {
        console.log(error1)
      }
      else {
        setProfile(profile[0])
        console.log(profile[0])
      }

      let { data: distributors, error } = await supabase
        .from('distributors')
        .select("*")
        .eq('zone_id', profile[0]['works_at'])
      if (error) {
        console.log(error)
      }
      else {
        setDistributorList(distributors)
        if (distributors.length > 0) {
          setDistributorId(distributors[0].id)
          setCreditLimit(distributors[0].credit_limit)
          setDefaultCredit(distributors[0].credit)
        }
        console.log(distributors)
      }
    }
    fetchData()
  }, []);

  function addInput(e) {
    e.preventDefault()
    setInputs([...inputs, {}])
    console.log(inputs);
  }

  function handleProductNameChange(e, index) {
    inputs[index].product_name = e.target.value
    setInputs(inputs)
    console.log(inputs);
  }

  function handleNetTotal() {
    let total = 0;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].rate && inputs[i].quantity) {
        total = total + (inputs[i].rate * inputs[i].quantity);
      }
    }
    console.log(total);
    setGrossTotal(total)

    let totalDis = 0
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].discount_amount) {
        totalDis = totalDis + inputs[i].discount_amount;
      }
    }
    console.log(totalDis);
    setTotalDiscount(totalDis)

    let net = total - totalDis;
    setNetTotal(net)
    console.log(net);

    let totalCredit = defaultCredit + net
    setCredit(totalCredit)

    setRefresh(refresh + ' net')
    console.log(refresh);
  }

  function handleQuantityChange(e, index) {
    inputs[index].quantity = parseInt(e.target.value)
    if (inputs[index].rate
      && inputs[index].quantity) {
      if (inputs[index].discount_percentage) {
        inputs[index].discount_amount = (inputs[index].rate * inputs[index].quantity) * (inputs[index].discount_percentage / 100);

        inputs[index].total_amount = (inputs[index].rate * inputs[index].quantity) - inputs[index].discount_amount
      } else {

        inputs[index].total_amount = inputs[index].rate * inputs[index].quantity;
      }
    }
    else {
      inputs[index].total_amount = 0
      inputs[index].discount_amount = 0

    }
    setInputs(inputs)
    console.log(inputs);

    handleNetTotal()

    setRefresh(refresh + ' e')
    console.log(refresh);

  }

  function handleRateChange(e, index) {
    inputs[index].rate = parseInt(e.target.value)
    if (inputs[index].rate
      && inputs[index].quantity) {
      if (inputs[index].discount_percentage) {
        inputs[index].discount_amount = (inputs[index].rate * inputs[index].quantity) * (inputs[index].discount_percentage / 100);

        inputs[index].total_amount = (inputs[index].rate * inputs[index].quantity) - inputs[index].discount_amount
      } else {

        inputs[index].total_amount = inputs[index].rate * inputs[index].quantity;
      }
    }
    else {
      inputs[index].total_amount = 0
      inputs[index].discount_amount = 0

    }
    setInputs(inputs)
    console.log(inputs);

    handleNetTotal()

    setRefresh(refresh + ' y')
    console.log(refresh);

  }

  function handleDiscountChange(e, index) {
    inputs[index].discount_percentage = parseInt(e.target.value)
    if (
      inputs[index].rate
      && inputs[index].quantity
      && inputs[index].discount_percentage
    ) {
      inputs[index].discount_amount = (inputs[index].rate * inputs[index].quantity) * (inputs[index].discount_percentage / 100);

      inputs[index].total_amount = (inputs[index].rate * inputs[index].quantity) - inputs[index].discount_amount

    } else if (inputs[index].rate
      && inputs[index].quantity
      && !inputs[index].discount_percentage
    ) {
      inputs[index].total_amount = inputs[index].rate * inputs[index].quantity;
      inputs[index].discount_amount = 0
    }

    setInputs(inputs)
    console.log(inputs);

    handleNetTotal()

    setRefresh(refresh + ' s')
    console.log(refresh);

  }

  function removeInput(e) {
    e.preventDefault()
    inputs.splice(inputs.length - 1, 1)
    setInputs([...inputs])
    console.log(inputs);
  }


  function handleDistributorOnChange(e) {
    setDistributorId(e.target.value.id)

    setCreditLimit(e.target.value.credit_limit)
    setDefaultCredit(e.target.value.credit)
  }

  useEffect(() => {
    async function fetchData() {

      if (distributorId) {

        let { data: distributors, error } = await supabase
          .from('distributors')
          .select("*")
          .eq('id', distributorId)
        if (error) {
          console.log(error)
        }
        else {
          setDistributorName(distributors[0].name)
          console.log(distributors[0].name)
        }
      }
    }
    fetchData()
  }, [distributorId]);


  // {
  //   zone_id: number,
  //   distributor_id: number,
  //   distributor_name: string,
  //   invoice_data: {
  //     gross_total: number,
  //     total_discount: number,
  //     net_total: number,
  //     products: [
  //       {name:string, unit_price:number, quantity:number, discount_percentage:number, discount_amount: number, total_price:number}
  //     ]
  //   }
  // }


  // create invoice
  async function handleInvoiceCreation(event) {
    event.preventDefault()
    console.log(inputs, 'inputs')
    console.log(grossTotal, 'gross total')
    console.log(totalDiscount, 'totalDiscount')
    console.log(netTotal, 'net total')
    console.log(user);

    const invoiceData = {
      gross_total: grossTotal,
      total_discount: totalDiscount,
      net_total: netTotal,
      products: inputs
    }
    const eventData = {
      zone_id: profile.works_at,
      distributor_id: distributorId,
      distributor_name: distributorName,
      invoice_data: invoiceData
    }

    console.log(eventData)



    const { data, error } = await supabase
      .from('order_events')
      .insert([
        { name: 'OrderCreatedByTSO', created_by: profile.id, data: eventData },
      ])

    if (error) {
      console.log(error)
    } else {
      console.log(data)
      history.push('/orders')

      setInputs([{}])
      setTotalDiscount(0)
      setNetTotal(0)
      setGrossTotal(0)
    }

  }


  return (
    <Container fluid className="main-content-container px-4 pb-5">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="12" title="Create Invoice" subtitle="Orders" className="text-sm-left" />
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
                          <FormSelect
                            id="feInputState"
                            defaultValue={distributorId}
                            onChange={(e) => {
                              handleDistributorOnChange(e)
                              console.log(e.target.value.id);
                            }}
                          >
                            {distributorList ? distributorList.map(distributor => (
                              <option key={distributor.id} value={distributor}>{distributor.name}</option>
                            )) : null}
                          </FormSelect>
                        </Col>

                        <Col sm={6} className="form-group">
                          <label htmlFor="feInputZip">Credit</label>
                          <FormInput
                            id="feInputZip"
                            value={credit}
                          />
                        </Col>
                        <Col sm={6} className="form-group">
                          <label htmlFor="feInputZip">Credit Limit</label>
                          <FormInput
                            id="feInputZip"
                            value={creditLimit}
                          />
                        </Col>
                      </Row>

                      {/* product name, quantity, rate, Total Amount */}
                      <Row form className='mt-1' style={{ alignItems: 'flex-end' }}>
                        {/* {inputs.length > 1 ? ( */}
                        <Col md="12" style={{
                          borderTop: '1px solid #d1d1d1',
                          margin: '15px 0'
                        }}></Col>
                        {/* ) : null} */}
                        {refresh ?

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
                                    type="text"
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
                                  <label htmlFor="feInputZip">Discount Percentage</label>
                                  <FormInput
                                    id="feInputZip"
                                    type='number'
                                    onChange={(e) => handleDiscountChange(e, index)}
                                  />
                                </Col>
                                <Col md="4" sm={4} xs={5} className="form-group">
                                  <label htmlFor="feInputZip">Discount Amount</label>
                                  <FormInput
                                    id="feInputZip"
                                    value={input.discount_amount || 0}
                                  />
                                </Col>
                                <Col md="4" sm={4} xs={5} className="form-group">
                                  <label htmlFor="feInputZip">Total Amount</label>
                                  <FormInput
                                    id="feInputZip"
                                    value={input.total_amount || 0}
                                  />
                                </Col>
                              </>
                            )
                          }) : null
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

                        {/* {inputs.length > 1 ? ( */}
                        <Col md="12" style={{
                          borderTop: '1px solid #d1d1d1',
                          margin: '15px 0'
                        }}></Col>
                        {/* ) : null} */}
                      </Row>


                      <h5 className="my-2">Gross Total: {grossTotal}</h5>
                      <h5 className="my-2">Total Discount: {totalDiscount}</h5>
                      <h4 className="my-2 mb-4">Net Total: {netTotal}</h4>
                      <Button type="submit" className='mt-2' onClick={handleInvoiceCreation}>Create Invoice</Button>
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