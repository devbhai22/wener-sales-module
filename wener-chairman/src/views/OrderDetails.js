import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import OrderDetailsCard from './OrderDetailsCard';
import OrderDetailsTable from './OrderDetailsTable';
import supabase from '../utils/supabase'
import Loading from '../components/Loading/Loading'

const OrderDetails = ({ match }) => {
    const [products, setProducts] = useState([]);
    const [returnProducts, setReturnProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            console.log(match.params.id);

            let { data: orders, error } = await supabase
                .from('orders')
                .select("*")
                .eq('id', parseInt(match.params.id))
            if (error) {
                console.log(error)
            }
            else {
                setProducts(orders[0].invoice_data.products)
                console.log(orders)

                setProducts(orders[0].invoice_data.products)
                console.log(orders, '<------ here are the orders')
                console.log(orders)
                //console.log(orders[0].invoice_data.return_products, "<------ here return products")
                if (orders[0].invoice_data.return_products) {
                    console.log('RETURN PRODUCTS EXIST')
                    setReturnProducts(orders[0].invoice_data.return_products)
                    console.log(orders[0].invoice_data.return_products, "<------ here return products")
                }
            }
        }
        fetchData()
    }, [match]);

    // if (loading){
    //     return (
    //         <Loading></Loading>
    //     )
    // }


    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    title="Order Details"
                    subtitle="Orders"
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
                <Col lg="3" xs={11} sm={8}>
                    <OrderDetailsCard id={match.params.id} />
                </Col>
                <Col lg="9">
                    <OrderDetailsTable products={products}></OrderDetailsTable>
                </Col>
                {returnProducts.length ? (
                            <>
                                <Row noGutters className="page-header py-4">
                                    <PageTitle
                                        title="Returned Products"
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
                                <Col sm={12}>
                                    <OrderDetailsTable products={returnProducts}></OrderDetailsTable>
                                </Col>
                            </>
                        ) : null}
            </Row>
        </Container>
    );
};

export default OrderDetails;
