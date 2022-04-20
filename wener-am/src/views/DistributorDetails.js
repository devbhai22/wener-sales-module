import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import DistributorDetailsCard from './DistributorDetailsCard';
import DistributorOrdersTable from './DistributorOrdersTable';
import supabase from '../utils/supabase'
import Loading from "../components/Loading/Loading";

const OrderDetails = ({ match }) => {
    const [orderList, setOrderList] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            console.log(match.params.id);

            let { data: orders, error } = await supabase
                .from('orders')
                .select("*")
                .eq('distributor_id', parseInt(match.params.id))
            if (error) {
                console.log(error)
            }
            else {
                setLoading(false)
                setOrderList(orders)
                // console.log(orders)
            }
        }
        fetchData()
    }, [match]);


    if (loading) {
        return <Loading></Loading>
    }


    return (
        <Container fluid className="main-content-container px-4">
            <Row noGutters className="page-header py-4">
                <PageTitle
                    title="Dealer Details"
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
                <Col lg="3" xs={11} sm={8}>
                    <DistributorDetailsCard id={match.params.id} />
                </Col>
                <Col lg="9">
                    <DistributorOrdersTable products={orderList}></DistributorOrdersTable>
                </Col>
            </Row>
        </Container>
    );
};

export default OrderDetails;
