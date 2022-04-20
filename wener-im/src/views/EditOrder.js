import React, { useEffect, useState } from "react";
import {
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Form,
    FormInput,
    FormSelect,
    Button,
    Container, Card, CardHeader, CardBody
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import supabase from "../utils/supabase";
import { useHistory } from "react-router-dom";

const EditOrder = ({ match }) => {
    const [order, setOrder] = useState({});  // only reading data
    const [inputs, setInputs] = useState([{}]);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [grossTotal, setGrossTotal] = useState(0);
    const [netTotal, setNetTotal] = useState(0);
    const [defaultCredit, setDefaultCredit] = useState(0)
    const [credit, setCredit] = useState(0)
    const [creditLimit, setCreditLimit] = useState(0)
    const [distributorId, setDistributorId] = useState('');
    const [distributorName, setDistributorName] = useState('');
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

            let { data: orders, error2 } = await supabase
                .from('orders')
                .select("*")
                .eq('id', parseInt(match.params.id))
            if (error2) {
                console.log(error2)
            }
            else {
                setOrder(orders[0])
                setInputs(orders[0].invoice_data.products)
                setGrossTotal(orders[0].invoice_data.gross_total)
                setNetTotal(orders[0].invoice_data.net_total)
                setTotalDiscount(orders[0].invoice_data.total_discount)

                console.log(orders[0])

                if (orders[0].distributor_id) {
                    let { data: distributors, error } = await supabase
                        .from('distributors')
                        .select("*")
                        .eq('id', orders[0].distributor_id)
                    if (error) {
                        console.log(error)
                    }
                    else {
                        setDistributorId(distributors[0].id)
                        setCreditLimit(distributors[0].credit_limit)
                        setCredit(distributors[0].credit + orders[0].invoice_data.net_total)
                        setDefaultCredit(distributors[0].credit)
                        console.log(distributors)
                    }
                }
            }
        }
        fetchData()
    }, [match]);


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
        console.log(totalCredit);


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



    // create invoice
    async function handleInvoiceCreation(event) {
        event.preventDefault()
        // console.log(inputs, 'inputs')
        // console.log(grossTotal, 'gross total')
        // console.log(totalDiscount, 'totalDiscount')
        // console.log(netTotal, 'net total')
        // console.log(user);

        const invoiceData = {
            gross_total: grossTotal,
            total_discount: totalDiscount,
            net_total: netTotal,
            products: inputs
        }
        const eventData = {
            order_id: order.id,
            invoice_data: invoiceData
        }

        console.log(eventData)

        const { data, error } = await supabase
            .from('order_events')
            .insert([
                { name: 'OrderApprovedByIM', created_by: profile.id, 'data': eventData, order_id: order.id },
            ])

        if (error) {
            console.log(error)
        } else {
            console.log(data)
            history.push('/orders')
        }

    }


    return (
        <Container fluid className="main-content-container px-4 pb-5">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="12" title="Edit Invoice" subtitle="Orders" className="text-sm-left" />
            </Row>
            {order.invoice_data ? (

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
                                                        <FormInput
                                                            id="feName"
                                                            type="text"
                                                            value={order.distributor_name}
                                                            disabled
                                                        />

                                                    </Col>

                                                    <Col sm={6} className="form-group">
                                                        <label htmlFor="feInputZip">Credit</label>
                                                        <FormInput
                                                            id="feInputZip"
                                                            value={credit}
                                                            disabled
                                                        />
                                                    </Col>
                                                    <Col sm={6} className="form-group">
                                                        <label htmlFor="feInputZip">Credit Limit</label>
                                                        <FormInput
                                                            id="feInputZip"
                                                            value={creditLimit}
                                                            disabled
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
                                                                            defaultValue={input.product_name}
                                                                            onChange={(e) => handleProductNameChange(e, index)}
                                                                        />
                                                                    </Col>
                                                                    <Col md="2"
                                                                        sm={4} xs={4}
                                                                        className="form-group">
                                                                        <label htmlFor="feInputZip">Quantity</label>
                                                                        <FormInput
                                                                            id="feInputZip"
                                                                            defaultValue={input.quantity}
                                                                            onChange={(e) => handleQuantityChange(e, index)}
                                                                        />
                                                                    </Col>
                                                                    <Col md="2" sm={4} xs={5} className="form-group">
                                                                        <label htmlFor="feInputZip">Rate</label>
                                                                        <FormInput
                                                                            id="feInputZip"
                                                                            defaultValue={input.rate}
                                                                            onChange={(e) => handleRateChange(e, index)}
                                                                        />
                                                                    </Col>

                                                                    <Col md="2" sm={4} xs={5} className="form-group">
                                                                        <label htmlFor="feInputZip">Discount Percentage</label>
                                                                        <FormInput
                                                                            id="feInputZip"
                                                                            type='number'
                                                                            defaultValue={input.discount_percentage}

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
                                                <Button type="submit" className='mt-2' onClick={handleInvoiceCreation}>Update Invoice</Button>
                                            </Form>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            ) : null}

            {order.invoice_data ? console.log(order.invoice_data.gross_total) : null}
        </Container >
    )
};

export default EditOrder;