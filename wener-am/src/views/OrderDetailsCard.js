import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    Button,
    ListGroup,
    ListGroupItem,
    Progress,
    FormInput
} from "shards-react";
import { useHistory } from "react-router-dom"
import supabase from '../utils/supabase'

const OrderDetailsCard = ({ id }) => {
    const [order, setOrder] = useState({})
    const [distributor, setDistributor] = useState({})
    const [amount, setAmount] = useState(0)
    const [returnedAmount, setReturnedAmount] = useState(null)
    const [totalAfterReturn, setTotalAfterReturn] = useState(null)

    const history = useHistory();
    const user = supabase.auth.user()

    useEffect(() => {
        async function fetchDistributor(orders) {
            let { data: distributors, error2 } = await supabase
                .from('distributors')
                .select("*")
                .eq('id', parseInt(orders[0].distributor_id))
            if (error2) {
                console.log(error2)
            }
            else {
                console.log(distributors, 'distributors list')
                setDistributor(distributors[0])

            }
        }
        async function fetchData() {

            let { data: orders, error } = await supabase
                .from('orders')
                .select("*")
                .eq('id', parseInt(id))
            if (error) {
                console.log(error)
            }
            else {
                setOrder(orders[0])
                console.log(orders)
            }
            await fetchDistributor(orders)

            console.log(orders, "TRYING OUT THE IF CONDITION")
            if(orders[0].invoice_data.return_net_total){
                
                let received = orders[0].invoice_data.received?orders[0].invoice_data.received:0
                setReturnedAmount(orders[0].invoice_data.return_net_total)
                console.log(orders[0].invoice_data.net_total, '<------- invoice data net total')
                console.log(orders[0].invoice_data.returned_net_total, '<-------- invoice data returned net total')
                console.log(received, 'received amount from invoice')
                setTotalAfterReturn(parseInt(orders[0].invoice_data.net_total) - parseInt(orders[0].invoice_data.return_net_total) - parseInt(received))
            }
        }
        
        fetchData()
    }, []);

    async function approveMoney(e) {
        e.preventDefault()
        console.log(order)

        if (window.confirm(`You are approving a transaction worth BDT ${amount}. Proceed?`) == true) {
            console.log('yes');

            console.log(amount);

            const eventData = {
                order_id: id,
                amount: amount
            }

            const { data, error } = await supabase
                .from('order_events')
                .insert([
                    { name: 'TransactionApprovedByAM', created_by: user.id, 'data': eventData },
                ])
            if (error) {
                console.log(error);
            } else {
                console.log(data);
                history.push(`/orders`)
            }
        } else {
            console.log('no');
        }


    }


    return (
        <Card small className="mb-4 pt-3">
            <CardHeader className="border-bottom ps-4">
                <div className="mb-3">
                </div>
                <span className="text-muted d-block mt-1">Business Name : {distributor.business_name}</span>
                <span className="text-muted d-block">Credit Limit : {distributor.credit_limit}</span>
                <span className="text-muted d-block">Current Credit : {distributor.credit}</span>
                {
                    distributor.credit_limit > distributor.credit?
                    <span className="text-muted d-block red">Credit Status : Under the limit </span>:
                    <span className="text-muted d-block green">Credit Status : Over the limit </span>
                } 
                <span className="text-muted d-block">Gross Total : <strong>{order.invoice_data? order.invoice_data.gross_total:null}</strong></span>
                <span className="text-muted d-block">Total Discount : <strong>{order.invoice_data? order.invoice_data.total_discount:null}</strong></span>
                <span className="text-muted d-block">Net Total : <strong>{order.invoice_data?order.invoice_data.net_total:null}</strong></span>
                <span className="text-muted d-block">Received : <strong>{order.invoice_data? (order.invoice_data.received?order.invoice_data.received:0) :null}</strong></span>
                <span className="text-muted d-block">Remaining : <strong>{order.invoice_data?(order.invoice_data.received?(order.invoice_data.net_total-order.invoice_data.received):order.invoice_data.net_total):null}</strong></span>
                {
                    returnedAmount?<>
                        <span className="text-muted d-block">Returned Amount : <strong>{returnedAmount}</strong></span>
                        <span className="text-muted d-block">Remaining After Return : <strong>{totalAfterReturn}</strong></span>
                    </>: null
                }
                </CardHeader>
            <ListGroup flush>
                


                {order.status === 'Order Dispatched' || 'Return Requested By TSO' || 'Return Requested By ZSM' || 'Return Requested By DM' || 'Return Requested By Chairman' || 'Return Approved By ZSM' || 'Return Approved By DM' || 'Return Approved By Chairman' || 'Return Approved By IM' ? (
                    <>
                        <ListGroupItem className="p-0 m-4 mx-auto">
                            <label htmlFor="feInputZip"
                                style={{ margin: 0 }}>Amount</label>
                            <FormInput
                                value={amount}
                                id="feInputZip"
                                onChange={(e) => setAmount(e.target.value)}
                                type='number'
                            />
                            <button
                                className="btn btn-secondary my-2"
                                type="button"
                                onClick={(e) => {
                                    approveMoney(e)
                                }} >
                                Received Money
                            </button>
                        </ListGroupItem>
                    </>
                ) : null}


            </ListGroup>
        </Card>
    );
}

export default OrderDetailsCard;



