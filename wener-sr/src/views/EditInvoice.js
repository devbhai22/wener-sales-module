import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormSelect,
  Button,
  Container,
  FormTextarea
} from "shards-react";
import supabase from "../utils/supabase";
import PageTitle from "../components/common/PageTitle";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import InvoiceInfo from "./InvoiceInfo";

const EditInvoice = () => {
  let orderid = useParams();

  //Invoice meta data
  const [distributorId, setDistributorId] = useState("");
  const [distributorName, setDistributorName] = useState("");
  const [distributorList, setDistributorList] = useState([]);
  const [initialCredit, setInitialCredit] = useState(0);
  const [credit, setCredit] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [profile, setProfile] = useState({});

  //Edit invoice state
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState({})
  const [invoiceInfo, setInvoiceInfo] = useState({})

  //Totals
  const [grossTotal, setGrossTotal] = useState(0);
  let [netTotal, setNetTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const history = useHistory();
  const user = supabase.auth.user();

  //calculate totals
  function handleNetTotal() {
    let total = 0;
    for (let i = 0; i < invoiceItems.length; i++) {
      if (invoiceItems[i].rate && invoiceItems[i].quantity) {
        total = total + invoiceItems[i].rate * invoiceItems[i].quantity;
      }
    }
    setGrossTotal(total);

    let totalDis = 0;
    for (let i = 0; i < invoiceItems.length; i++) {
      if (invoiceItems[i].discount_amount) {
        totalDis = totalDis + invoiceItems[i].discount_amount;
      }
    }
    setTotalDiscount(totalDis);

    let prevNet = netTotal;
    let net = total - totalDis;
    setNetTotal(net);

    if (prevNet != net) {
      let totalCredit = initialCredit + net;
      setCredit(totalCredit);
    }
  }

  //distributor change
  async function handleDistributorOnChange(e) {
    setDistributorId(e.target.value);

    let { data: distributors, error } = await supabase
      .from("distributors")
      .select("*")
      .eq("id", e.target.value);
    if (error) {
      console.log(error);
    } else {
      setDistributorName(distributors[0].business_name);
      setCreditLimit(distributors[0].credit_limit);
      setInitialCredit(distributors[0].credit);
      setCredit(distributors[0].credit + netTotal);
    }
  }

  // create invoice
  async function handleInvoiceCreation(e) {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      if (window.confirm("Are you sure you want to proceed?")) {
      const invoiceData = {
        initial_credit: initialCredit,
        create_date: new Date().toLocaleString("en-UK"),
        invoice_id: "p" + new Date().getTime(),
        payment_method: invoiceInfo.payment_method,
        transport_name: invoiceInfo.transport_name,
        transport_address: invoiceInfo.transport_address,
        products: invoiceItems,
        picture_name: invoiceInfo.payment_slip_name,
        picture_path: invoiceInfo.payment_slip_path,
        notes: invoiceInfo.notes,
        gross_total: grossTotal,
        total_discount: totalDiscount,
        net_total: netTotal
      };
      const eventData = {
        territory_id: profile.works_at,
        distributor_id: distributorId,
        distributor_name: distributorName,
        invoice_data: invoiceData
      };


      const { data, error } = await supabase.from("order_events").insert([
        {
          name: "OrderCreatedByTSO",
          created_by: profile.id,
          data: eventData
        }
      ]);

      if (error) {
        console.log(error);
      } else {
        console.log(data);
        history.push("/orders");

        setInvoiceItems([{}]);
        setTotalDiscount(0);
        setNetTotal(0);
        setGrossTotal(0);
      }
    }else {
      e.preventDefault();
    }
  } else {
    alert("Errors exist in the form.");
  }
}
  

  useEffect(() => {
    //User profile information
    async function fetchData() {
      let { data: profile, error1 } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id);
      if (error1) {
        console.log(error1);
      } else {
        setProfile(profile[0]);
        console.log(profile[0]);
      }

      let { data, error3 } = await supabase
        .from('orders')
        .select("*")
        .eq('id', orderid.id)
      if (error3) {
        console.log(error3)
      }
      else {
        setInvoiceInfo(
          {
            payment_method: data[0].invoice_data.payment_method,
            payment_slip_name: data[0].invoice_data.picture_name ? data[0].invoice_data.picture_name.split('.')[0] : '',
            payment_slip_path: data[0].invoice_data.picture_path,
            transport_name: data[0].invoice_data.transport_name,
            transport_address: data[0].invoice_data.transport_address,
            notes: data[0].invoice_data.notes
          }
        )
        setInvoiceItems(data[0].invoice_data.products)
        setDistributorId(data[0].distributor_id)
        setGrossTotal(data[0].invoice_data.gross_total)
        setNetTotal(data[0].invoice_data.net_total)
        setInitialCredit(data[0].invoice_data.initial_credit)
        setTotalDiscount(data[0].invoice_data.total_discount)
      }

      //Distributors working under user
      let { data: distributors, error } = await supabase
        .from("distributors")
        .select("*")
        .eq("territory_id", profile[0]["works_at"]);
      if (error) {
        console.log(error);
      } else {
        setDistributorList(distributors);
        console.log(distributors);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    //Set distributor credit limit
    async function fetchData() {
      console.log(distributorName)
      console.log(distributorId)
      console.log(distributorName)
      if (distributorId) {
        let { data: distributors, error } = await supabase
          .from("distributors")
          .select("*")
          .eq("id", distributorId);
        if (error) {
          console.log(error);
        } else {
          setDistributorName(distributors[0].business_name);
          setCreditLimit(distributors[0].credit_limit);
          setCredit(distributors[0].credit + netTotal);
          setInitialCredit(distributors[0].credit);
        }
      }
    }
    fetchData();
  }, [distributorId]);

  useEffect(() => {
    handleNetTotal();
  });

  useEffect(() => {
    console.log(invoiceInfo)
  });

  return (
    <Container fluid className="main-content-container px-4 pb-5">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="12"
          title="Create Invoice"
          subtitle="Orders"
          className="text-sm-left"
        />
      </Row>

      <Col lg="10" className="mb-6">
        <ListGroup flush>
          <ListGroupItem className="p-4">
            <Form>
              <Row form>
                <Col md="12" className="form-group">
                  <label htmlFor="feInputState">Choose Distributor</label>
                  <FormSelect
                    id="feInputState"
                    value={distributorId}
                    onChange={e => {
                      handleDistributorOnChange(e);
                    }}
                  >
                    {distributorList
                      ? distributorList.map(distributor => (
                          <option key={distributor.id} value={distributor.id}>
                            {distributor.business_name}
                          </option>
                        ))
                      : null}
                  </FormSelect>
                </Col>

                <Col sm={6} className="form-group">
                  <label htmlFor="feInputZip">
                    Credit:{" "}
                    {credit > creditLimit ? (
                      <span style={{ color: "#ff0000" }}>OVER THE LIMIT</span>
                    ) : (
                      <span style={{ color: "#008000" }}>UNDER THE LIMIT</span>
                    )}
                  </label>
                  <FormInput id="feInputZip" value={credit} disabled />
                </Col>
                <Col sm={6} className="form-group">
                  <label htmlFor="feInputZip">Credit Limit</label>
                  <FormInput id="feInputZip" value={creditLimit} disabled />
                </Col>
              </Row>
              
              <hr
                style={{
                  border: "none",
                  height: "1px",
                  backgroundColor: "#333"
                }}
              />
              <InvoiceInfo
                invoiceInfo={invoiceInfo}
                setInvoiceInfo={setInvoiceInfo}
              ></InvoiceInfo>
              <br></br>

              <Row form className="mt-1" style={{ alignItems: "flex-end" }}>
                <ProductForm
                  invoiceItems={invoiceItems}
                  setInvoiceItems={setInvoiceItems}
                  setError = {setError}
                ></ProductForm>
                <ProductList
                  handleNetTotal={handleNetTotal}
                  invoiceItems={invoiceItems}
                  setInvoiceItems={setInvoiceItems}
                  editing={editing}
                  setEditing={setEditing}
                  error = {error}
                  setError = {setError}
                ></ProductList>
              </Row>

              <h5 className="my-2">Gross Total: {grossTotal}</h5>
              <h5 className="my-2">Total Discount: {totalDiscount}</h5>
              <h5 className="my-2 mb-4">Net Total: {netTotal}</h5>
              <Button
                type="submit"
                onClick={e => {
                  e.preventDefault();
                  if (editing) {
                    alert("Save all items first!");
                  } else {
                    handleInvoiceCreation(e);
                  }
                }}
              >
                Update Invoice
              </Button>
            </Form>
          </ListGroupItem>
        </ListGroup>
      </Col>
    </Container>
  );
};

export default EditInvoice;