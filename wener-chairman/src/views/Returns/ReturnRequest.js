import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
import PageTitle from "../../components/common/PageTitle";
import supabase from "../../utils/supabase";
import Loading from "../../components/Loading/Loading";

const ReturnRequest = ({ match }) => {
    const [order, setOrder] = useState({});  // only reading data
    const [inputs, setInputs] = useState([{}]);  // manupulating Products
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [grossTotal, setGrossTotal] = useState(0);
    const [netTotal, setNetTotal] = useState(0);
    const [refresh, setRefresh] = useState('y');
    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)

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

            let { data: orders, error } = await supabase
                .from('orders')
                .select("*")
                .eq('id', parseInt(match.params.id))
            if (error) {
                console.log(error)
            }
            else {
                setOrder(orders[0])
                setInputs(orders[0].invoice_data.products)
                setGrossTotal(orders[0].invoice_data.gross_total)
                setNetTotal(orders[0].invoice_data.net_total)
                setTotalDiscount(orders[0].invoice_data.total_discount)

                console.log(typeof (orders[0].invoice_data))
                console.log(orders[0])
                setLoading(false)
            }
        }
        fetchData()
    }, [match]);

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

    // create invoice
    async function handleInvoiceCreation(event) {
        event.preventDefault()
        console.log(inputs, 'inputs')
        console.log(grossTotal, 'gross total')
        console.log(totalDiscount, 'totalDiscount')
        console.log(netTotal, 'net total')
        console.log(user);

        const invoiceData = {
            // gross_total: grossTotal,
            // total_discount: totalDiscount,
            net_total: netTotal,
            products: inputs
        }
        const eventData = {
            // territory_id: order.territory_id,
            // distributor_id: order.division_id,
            // distributor_name: order.distributor_name,
            order_id: match.params.id,
            invoice_data: invoiceData
        }

        console.log(eventData)


        const { data, error } = await supabase
            .from('order_events')
            .insert([
                { name: 'ReturnRequestedByTSO', created_by: profile.id, 'data': eventData },
            ])

        if (error) {
            console.log(error)
        } else {
            console.log(data)
            history.push('/orders')
        }
    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <Container fluid className="main-content-container px-4 pb-5">
            {/* Page Header */}
            <Row noGutters className="page-header py-4">
                <PageTitle sm="12" title="Create Invoice" subtitle="Orders" className="text-sm-left" />
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
                                                                            value={input.product_name}
                                                                            disabled
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
                                                                            value={input.rate}
                                                                            disabled
                                                                        />
                                                                    </Col>

                                                                    <Col md="2" sm={4} xs={5} className="form-group">
                                                                        <label htmlFor="feInputZip">Discount Percentage</label>
                                                                        <FormInput
                                                                            id="feInputZip"
                                                                            type='number'
                                                                            value={input.discount_percentage}
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                    <Col md="4" sm={4} xs={5} className="form-group">
                                                                        <label htmlFor="feInputZip">Discount Amount</label>
                                                                        <FormInput
                                                                            id="feInputZip"
                                                                            value={input.discount_amount || 0}
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                    <Col md="4" sm={4} xs={5} className="form-group">
                                                                        <label htmlFor="feInputZip">Total Amount</label>
                                                                        <FormInput
                                                                            id="feInputZip"
                                                                            value={input.total_amount || 0}
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                </>
                                                            )
                                                        }) : null
                                                    }

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
            ) : null}

            {order.invoice_data ? console.log(order.invoice_data.gross_total) : null}

        </Container >
    )
};

export default ReturnRequest;


