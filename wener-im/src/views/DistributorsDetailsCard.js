import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Card,
    CardHeader,
    Button,
    ListGroup,
    ListGroupItem,
    Progress
} from "shards-react";
import { useHistory } from "react-router-dom"
import supabase from '../utils/supabase'

const DistributorDetailsCard = ({ id }) => {
    const [distributor, setDistributor] = useState({})

    const history = useHistory();
    const user = supabase.auth.user()

    useEffect(() => {
        async function fetchData() {

            let { data: distributors, error } = await supabase
                .from('distributors')
                .select("*")
                .eq('id', parseInt(id))
            if (error) {
                console.log(error)
            }
            else {
                setDistributor(distributors[0])
                console.log(distributors)
            }
        }
        fetchData()
    }, []);


    return (
        <Card small className="mb-4 pt-3">
            <CardHeader className="border-bottom ps-4 " style={{ fontSize: '20px' }}>
                <div className="mb-1">
                </div>
                <span className="text-muted d-block mb-2 mt-1"><span style={{ color: '#525252' }}>Name : </span> {distributor.name}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>division_id : </span>{distributor.division_id}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>zone_id : </span>{distributor.zone_id}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>territory_id : </span>{distributor.territory_id}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>credit : </span>{distributor.credit}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>credit_limit : </span>{distributor.credit_limit}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>business_type : </span>{distributor.business_type}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>address : </span>{distributor.address}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>phone : </span>{distributor.phone}</span>

                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.nid_path}`}>
                    <button className="btn btn-primary d-block mx-auto my-3">Show NID Card</button>
                </a>

                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.trade_license_path}`}>
                    <button className="btn btn-success d-block mx-auto mb-3">Show Trade License</button>
                </a>
            </CardHeader>

        </Card>
    );
}

export default DistributorDetailsCard;



