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
import Loading from '../components/Loading/Loading'

const DistributorDetailsCard = ({ id }) => {
    const [distributor, setDistributor] = useState({})
    const [loading, setLoading] = useState(true)

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
            setLoading(false)
        }
        fetchData()
    }, []);


    if (loading){
        return (
            <Loading></Loading>
        )
    }
    return (
        <Card small className="mb-4 pt-3">
            <CardHeader className="border-bottom ps-4 " style={{ fontSize: '20px' }}>
                <div className="mb-1">
                </div>
                <span className="text-muted d-block mb-2 mt-1"><span style={{ color: '#525252' }}>Business Name : </span> {distributor.business_name}</span>
                <span className="text-muted d-block mb-2 mt-1"><span style={{ color: '#525252' }}>Proprietor Name : </span> {distributor.proprietor_name}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>Division : </span>{distributor.division_name}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>Zone : </span>{distributor.zone_name}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>Territory : </span>{distributor.territory_name}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>Credit : </span>{distributor.credit}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>Credit Limit : </span>{distributor.credit_limit}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>Business Type : </span>{distributor.business_type}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>Present Address : </span>{distributor.present_address}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>Parmanent Address : </span>{distributor.parmanent_address}</span>
                <span className="text-muted d-block mb-2"><span style={{ color: '#525252' }}>Phone Number : </span>{distributor.phone}</span>


                {distributor.picture_path?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.picture_path}`}>
                    <button className="btn btn-primary d-block mx-auto mb-3 w-100">View Picture</button>
                </a> : 
                <a target='_blank'>
                    <button className="btn btn-secondary d-block mx-auto mb-3 w-100">No Picture Available</button>
                </a>
                }

                {distributor.application_path?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.application_path}`}>
                    <button className="btn btn-primary d-block mx-auto mb-3 w-100">View Application</button>
                </a> : 
                <a target='_blank'>
                    <button className="btn btn-secondary d-block mx-auto mb-3 w-100">No Application Available</button>
                </a>
                }

                {distributor.deed_path?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.deed_path}`}>
                    <button className="btn btn-primary d-block mx-auto mb-3 w-100">View Deed</button>
                </a> : 
                <a target='_blank'>
                    <button className="btn btn-secondary d-block mx-auto mb-3 w-100">No Deed Available</button>
                </a>
                }
                
                {distributor.nid_path?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.nid_path}`}>
                    <button className="btn btn-primary d-block mx-auto mb-3 w-100">View NID</button>
                </a> : 
                <a target='_blank'>
                    <button className="btn btn-secondary d-block mx-auto mb-3 w-100">No NID Available</button>
                </a>
                }

                {distributor.trade_license_path?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.trade_license_path}`}>
                    <button className="btn btn-primary d-block mx-auto mb-3 w-100">View Trade License</button>
                </a> : 
                <a target='_blank'>
                    <button className="btn btn-secondary d-block mx-auto mb-3 w-100">No Trade License Available</button>
                </a>
                }

                {distributor.salvage_certificate_path?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.salvage_certificate_path}`}>
                    <button className="btn btn-primary d-block mx-auto mb-3 w-100">View Solvency Certificate</button>
                </a> : 
                <a target='_blank'>
                    <button className="btn btn-secondary d-block mx-auto mb-3 w-100">No Solvency Certificate Available</button>
                </a>
                }

                {distributor.bank_statement_path?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.bank_statement_path}`}>
                    <button className="btn btn-primary d-block mx-auto mb-3 w-100">View Bank Statement</button>
                </a> : 
                <a target='_blank'>
                    <button className="btn btn-secondary d-block mx-auto mb-3 w-100">No Bank Statement Available</button>
                </a>
                }

                {distributor.agreement_path?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.agreement_path}`}>
                    <button className="btn btn-primary d-block mx-auto mb-3 w-100">View Agreement</button>
                </a> : 
                <a target='_blank'>
                    <button className="btn btn-secondary d-block mx-auto mb-3 w-100">No Agreement Available</button>
                </a>
                }

                {distributor.cheque_path?
                <a target='_blank' href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.cheque_path}`}>
                    <button className="btn btn-primary d-block mx-auto mb-3 w-100">View Cheque</button>
                </a> : 
                <a target='_blank'>
                    <button className="btn btn-secondary d-block mx-auto mb-3 w-100">No Cheque Available</button>
                </a>
                }


                <ListGroupItem className="p-0" style={{ border: 'none' }}>
                    <button className="btn btn-info d-block m-4 mx-auto" type="button" onClick={() => {
                        history.push(`/distributors/${id}/edit`)
                    }}>Edit Dealer</button>
                </ListGroupItem>

            </CardHeader>

        </Card>
    );
}

export default DistributorDetailsCard;



