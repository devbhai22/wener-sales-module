import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  ListGroupItem,
  Col,
  Row,
  Button,
  ButtonGroup
} from "shards-react";
import { useHistory } from "react-router-dom";
import supabase from "../../utils/supabase";
import Loading from "../../components/Loading/Loading";

const DistributorDetailsCard = ({ id }) => {
  const [distributor, setDistributor] = useState({});
  const [loading, setLoading] = useState('true');
  const [editAccess, setEditAccess] = useState('false');

  const history = useHistory();

  async function cancelEditRequest(){
    const { data, error } = await supabase
    .from('notifications')
    .delete()
    .match({ distributor_location: distributor.id })
  }

  useEffect(() => {
    async function fetchData() {
      let { data: distributors, error } = await supabase
        .from("distributors")
        .select("*")
        .eq("id", parseInt(id));
      if (error) {
        console.log(error);
      } else {
        setDistributor(distributors[0]);
        setEditAccess(distributors[0].edit_access)
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  //Give
  async function handleAccessClick(event) {
    event.preventDefault();

    const { data, error } = await supabase
      .from("distributors")
      .update({
        edit_access: 'true'
      })
      .eq("id", parseInt(id));
    if (error) {
      console.log(error);
    } else {
      console.log(editAccess);
    }
    setEditAccess('true');
    cancelEditRequest()
  }

  //Restrain
  async function handleAccessClick2(event) {
    event.preventDefault();

    const { data, error } = await supabase
      .from("distributors")
      .update({
        edit_access: 'false'
      })
      .eq("id", parseInt(id));
    if (error) {
      console.log(error);
    } else {
      console.log(editAccess);
    }
    setEditAccess('false');
  }

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <Card small className="mb-4 pt-3">
      <CardHeader className="border-bottom ps-4 " style={{ fontSize: "20px" }}>
        <div className="mb-1"></div>
        <span className="text-muted d-block mb-2 mt-1">
          <span style={{ color: "#525252" }}>Business Name : </span>{" "}
          {distributor.business_name}
        </span>
        <span className="text-muted d-block mb-2 mt-1">
          <span style={{ color: "#525252" }}>Proprietor Name : </span>{" "}
          {distributor.proprietor_name}
        </span>
        <span className="text-muted d-block mb-2">
          <span style={{ color: "#525252" }}>Division : </span>
          {distributor.division_name}
        </span>
        <span className="text-muted d-block mb-2">
          <span style={{ color: "#525252" }}>Zone : </span>
          {distributor.zone_name}
        </span>
        <span className="text-muted d-block mb-2">
          <span style={{ color: "#525252" }}>Territory : </span>
          {distributor.territory_name}
        </span>
        <span className="text-muted d-block mb-2">
          <span style={{ color: "#525252" }}>Credit : </span>
          {distributor.credit}
        </span>
        <span className="text-muted d-block mb-2">
          <span style={{ color: "#525252" }}>Credit Limit : </span>
          {distributor.credit_limit}
        </span>
        <span className="text-muted d-block mb-2">
          <span style={{ color: "#525252" }}>Business Type : </span>
          {distributor.business_type}
        </span>
        <span className="text-muted d-block mb-2">
          <span style={{ color: "#525252" }}>Present Address : </span>
          {distributor.present_address}
        </span>
        <span className="text-muted d-block mb-2">
          <span style={{ color: "#525252" }}>Permanent Address : </span>
          {distributor.permanent_address}
        </span>
        <span className="text-muted d-block mb-2">
          <span style={{ color: "#525252" }}>Phone Number : </span>
          {distributor.phone}
        </span>

        {distributor.picture_path ? (
          <a
            target="_blank"
            href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.picture_path}`}
          >
            <button className="btn btn-primary d-block mx-auto mb-3 w-100">
              View Picture
            </button>
          </a>
        ) : (
          <a target="_blank">
            <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
              No Picture Available
            </button>
          </a>
        )}

        {distributor.application_path ? (
          <a
            target="_blank"
            href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.application_path}`}
          >
            <button className="btn btn-primary d-block mx-auto mb-3 w-100">
              View Application
            </button>
          </a>
        ) : (
          <a target="_blank">
            <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
              No Application Available
            </button>
          </a>
        )}

        {distributor.deed_path ? (
          <a
            target="_blank"
            href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.deed_path}`}
          >
            <button className="btn btn-primary d-block mx-auto mb-3 w-100">
              View Deed
            </button>
          </a>
        ) : (
          <a target="_blank">
            <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
              No Deed Available
            </button>
          </a>
        )}

        {distributor.nid_path ? (
          <a
            target="_blank"
            href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.nid_path}`}
          >
            <button className="btn btn-primary d-block mx-auto mb-3 w-100">
              View NID
            </button>
          </a>
        ) : (
          <a target="_blank">
            <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
              No NID Available
            </button>
          </a>
        )}

        {distributor.trade_license_path ? (
          <a
            target="_blank"
            href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.trade_license_path}`}
          >
            <button className="btn btn-primary d-block mx-auto mb-3 w-100">
              View Trade License
            </button>
          </a>
        ) : (
          <a target="_blank">
            <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
              No Trade License Available
            </button>
          </a>
        )}

        {distributor.salvage_certificate_path ? (
          <a
            target="_blank"
            href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.salvage_certificate_path}`}
          >
            <button className="btn btn-primary d-block mx-auto mb-3 w-100">
              View Solvency Certificate
            </button>
          </a>
        ) : (
          <a target="_blank">
            <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
              No Solvency Certificate Available
            </button>
          </a>
        )}

        {distributor.bank_statement_path ? (
          <a
            target="_blank"
            href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.bank_statement_path}`}
          >
            <button className="btn btn-primary d-block mx-auto mb-3 w-100">
              View Bank Statement
            </button>
          </a>
        ) : (
          <a target="_blank">
            <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
              No Bank Statement Available
            </button>
          </a>
        )}

        {distributor.agreement_path ? (
          <a
            target="_blank"
            href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.agreement_path}`}
          >
            <button className="btn btn-primary d-block mx-auto mb-3 w-100">
              View Agreement
            </button>
          </a>
        ) : (
          <a target="_blank">
            <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
              No Agreement Available
            </button>
          </a>
        )}

        {distributor.cheque_path ? (
          <a
            target="_blank"
            href={`https://mkzyadsfkznopwggpnhm.supabase.in/storage/v1/object/public/documents/${distributor.cheque_path}`}
          >
            <button className="btn btn-primary d-block mx-auto mb-3 w-100">
              View Cheque
            </button>
          </a>
        ) : (
          <a target="_blank">
            <button className="btn btn-secondary d-block mx-auto mb-3 w-100">
              No Cheque Available
            </button>
          </a>
        )}
        <Row className="m-4">
          <ButtonGroup>
            <Button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                history.push(`/distributors/${id}/edit`);
              }}
            >
              Edit Dealer
            </Button>
            {editAccess == 'true' ?
            (
              <Button
                className="btn btn-info"
                type="button"
                onClick={handleAccessClick2}
              >
                Restrain Edit Access
              </Button>
            )
            :
            (
              <Button
                style={{ backgroundColor: "#1f99e0" }}
                type="button"
                onClick={handleAccessClick}
              >
                Give Edit Access
              </Button>
            )
          }
          </ButtonGroup>
        </Row>
      </CardHeader>
    </Card>
  );
};

export default DistributorDetailsCard;
