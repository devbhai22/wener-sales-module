import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormSelect,
  Button,
  Container,
  Card,
  CardHeader,
  CardBody
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import supabase from "../utils/supabase";
import { useHistory } from "react-router-dom";

const EditOrder = () => {
  let orderid = useParams();
  console.log(orderid.id);

  const [totalDiscount, setTotalDiscount] = useState(0);
  const [grossTotal, setGrossTotal] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const [initialCredit, setInitialCredit] = useState(0);
  const [credit, setCredit] = useState(0);
  const [creditLimit, setCreditLimit] = useState(0);
  const [distributorId, setDistributorId] = useState("");
  const [distributorName, setDistributorName] = useState("");
  const [distributorList, setDistributorList] = useState([]);
  const [refresh, setRefresh] = useState("y");
  const [profile, setProfile] = useState({});

  const [updateMessage, setUpdateMessage] = useState(true);

  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [id, setId] = useState(new Date().getTime());
  const [invoiceItems, setInvoiceItems] = useState([]);

  const [editing, setEditing] = useState(false);

  var arrayItems = [];

  const [createDate, setCreateDate] = useState("");
  const [invoiceID, setInvoiceID] = useState("");
  const [editProductName, setEditProductName] = useState("");
  const [editQuantity, setEditQuantity] = useState(0);
  const [editUnitPrice, setEditUnitPrice] = useState(0);
  const [editDiscountPercentage, setEditDiscountPercentage] = useState(0);
  const [editDiscountAmount, setEditDiscountAmount] = useState(0);
  const [editTotalAmount, setEditTotalAmount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([
    "Bkash",
    "Cheque",
    "Cash",
    "Mobile banking"
  ]);
  const [paymentSlipName, setPaymentSlipName] = useState("");
  const [paymentSlipPath, setPaymentSlipPath] = useState(null);

  let invoiceItem = {
    product_name: "",
    quantity: 0,
    rate: 0,
    discount_percentage: 0,
    discount_amount: 0,
    total_amount: 0,
    id: 0,
    editing: false
  };

  function handleAddClick(e) {
    e.preventDefault();

    var newItem = Object.create(invoiceItem);
    newItem.product_name = productName;
    newItem.quantity = quantity;
    newItem.rate = unitPrice;
    newItem.discount_percentage = discountPercentage;
    newItem.discount_amount = discountAmount;
    newItem.total_amount = totalAmount;
    newItem.editing = false;
    setId(new Date().getTime());
    newItem.id = id;

    arrayItems = [...invoiceItems, newItem];
    setInvoiceItems(arrayItems);

    setUpdateMessage(false);
  }

  function handleDeleteClick(id, e) {
    if (editing) {
      window.alert("Save all items first!");
      e.preventDefault();
    } else {
      e.preventDefault();
      arrayItems = [...invoiceItems].filter(item => item.id != id);
      setInvoiceItems(arrayItems);
      setUpdateMessage(false);
    }
  }

  function handleEdit(e, index) {
    invoiceItems[index].product_name = editProductName;
    invoiceItems[index].quantity = editQuantity;
    invoiceItems[index].rate = editUnitPrice;
    invoiceItems[index].discount_percentage = editDiscountPercentage;
    invoiceItems[index].discount_amount = editDiscountAmount;
    invoiceItems[index].total_amount = editTotalAmount;
  }

  const history = useHistory();
  const user = supabase.auth.user();

  useEffect(() => {
    async function fetchData() {
      let { data, error3 } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderid.id);
      if (error3) {
        console.log(error3);
      } else {
        setInvoiceItems(data[0].invoice_data.products);
        setPaymentMethod(data[0].invoice_data.payment_method);
        setPaymentSlipName(
          data[0].invoice_data.picture_name
            ? data[0].invoice_data.picture_name.split(".")[0]
            : ""
        );
        setPaymentSlipName(data[0].invoice_data.picture_path);
        setDistributorId(data[0].distributor_id);
        setGrossTotal(data[0].invoice_data.gross_total);
        setNetTotal(data[0].invoice_data.net_total);
        setInitialCredit(data[0].invoice_data.initial_credit);
        setTotalDiscount(data[0].invoice_data.total_discount);
      }

      let { data: distributors, error } = await supabase
        .from("distributors")
        .select("*")
        .eq("division_id", data[0]["division_id"]);
      if (error) {
        console.log(error);
      } else {
        setDistributorList(distributors);
        console.log(distributors);
      }
    }
    fetchData();
  }, []);

  function collectData(index) {
    setEditProductName(invoiceItems[index].product_name);
    setEditQuantity(invoiceItems[index].quantity);
    setEditDiscountPercentage(invoiceItems[index].discount_percentage);
    setEditUnitPrice(invoiceItems[index].rate);
    setEditDiscountAmount(invoiceItems[index].discount_amount);
    setEditTotalAmount(invoiceItems[index].total_amount);
  }

  function handleNetTotal() {
    console.log("p" + initialCredit);
    let total = 0;
    for (let i = 0; i < invoiceItems.length; i++) {
      if (invoiceItems[i].rate && invoiceItems[i].quantity) {
        total = total + invoiceItems[i].rate * invoiceItems[i].quantity;
      }
    }
    console.log(total);
    setGrossTotal(total);

    let totalDis = 0;
    for (let i = 0; i < invoiceItems.length; i++) {
      if (invoiceItems[i].discount_amount) {
        totalDis = totalDis + invoiceItems[i].discount_amount;
      }
    }
    console.log(totalDis);
    setTotalDiscount(totalDis);

    let prevNet = netTotal;
    let net = total - totalDis;

    setNetTotal(net);
    console.log(netTotal);

    if (prevNet != net) {
      let totalCredit = initialCredit + net;
      setCredit(totalCredit);
    }

    setRefresh(refresh + " net");
    console.log(refresh);

    if (net == netTotal) {
      setUpdateMessage(true);
    }
  }

  async function handleDistributorOnChange(e) {
    setDistributorId(e.target.value);

    let { data: distributors, error } = await supabase
      .from("distributors")
      .select("*")
      .eq("id", e.target.value);
    if (error) {
      console.log(error);
    } else {
      setCreditLimit(distributors[0].credit_limit);
      setCredit(distributors[0].credit);
    }
    console.log(distributors);
  }

  useEffect(() => {
    async function fetchData() {
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
          setCredit(distributors[0].credit);
          console.log(distributors[0].name);
        }
      }
    }
    fetchData();
  }, [distributorId]);

  // {
  //   division_id: number,
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

  const uploadDocument = async (event, documentType) => {
    try {
      if (!event.target.files || event.target.files.length == 0) {
        throw "You must select an image to upload.";
      }

      const user = supabase.auth.user();
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = file.name.split(".")[0];
      const filePath = `flreew_0/${file.name}${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("documents")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      if (documentType == "paymentSlip") {
        setPaymentSlipName(fileName);
        setPaymentSlipPath(filePath);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // create invoice
  async function handleInvoiceCreation(e) {
    e.preventDefault();

    setCreateDate(new Date().toLocaleString("en-UK"));
    setInvoiceID("p" + new Date().getTime());

    if (createDate && invoiceID) {
      if (window.confirm("Are you sure you want to proceed?")) {
        console.log(invoiceItems, "inputs");
        console.log(grossTotal, "gross total");
        console.log(totalDiscount, "totalDiscount");
        console.log(netTotal, "net total");
        console.log(user);

        const invoiceData = {
          create_date: createDate,
          invoice_id: invoiceID,
          gross_total: grossTotal,
          total_discount: totalDiscount,
          net_total: netTotal,
          payment_method: paymentMethod,
          paymentSlip_name: paymentSlipName,
          paymentSlip_path: paymentSlipPath,
          picture_path: paymentSlipPath,
          products: invoiceItems,
          initial_credit: initialCredit
        };
        const eventData = {
          territory_id: profile.works_at,
          distributor_id: distributorId,
          distributor_name: distributorName,
          initial_credit: initialCredit,
          invoice_data: invoiceData
        };

        console.log(eventData);

        const { data, error } = await supabase
          .from("order_events")
          .insert([
            {
              name: "OrderApprovedByIM",
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

        const { data2, error2 } = await supabase
          .from("orders")
          .delete()
          .eq("id", `${orderid.id}`);
        if (error) {
          console.log(error2);
        }
      } else {
        e.preventDefault();
      }
    }
  }

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
                          <label htmlFor="feInputState">
                            Choose Distributor
                          </label>
                          <FormSelect
                            id="feInputState"
                            value={distributorId}
                            onChange={e => {
                              handleDistributorOnChange(e);
                              console.log(e.target.value);
                            }}
                          >
                            {distributorList
                              ? distributorList.map(distributor => (
                                  <option
                                    key={distributor.id}
                                    value={distributor.id}
                                  >
                                    {distributor.business_name}
                                  </option>
                                ))
                              : null}
                          </FormSelect>
                        </Col>

                        <Row>
                          <Col md="12" className="form-group">
                            <label htmlFor="feInputState">
                              Choose Payment Method
                            </label>
                            <FormSelect
                              id="feInputState"
                              value={paymentMethod}
                              onChange={e => {
                                setPaymentMethod(e.target.value);
                              }}
                            >
                              {paymentMethods
                                ? paymentMethods.map(thisPaymentMethod => (
                                    <option
                                      key={thisPaymentMethod}
                                      value={thisPaymentMethod}
                                    >
                                      {thisPaymentMethod}
                                    </option>
                                  ))
                                : null}
                            </FormSelect>
                          </Col>
                          <Col md="12" className="form-group">
                            <FormGroup>
                              <label htmlFor="feInputName">
                                Upload Payment Slip
                              </label>
                              <div className="custom-file">
                                <input
                                  type="file"
                                  accept=".png,.jpg,.pdf"
                                  className="custom-file-input"
                                  id="customFile2"
                                  onChange={e =>
                                    uploadDocument(e, "paymentSlip")
                                  }
                                  // value={profilePicture}
                                />
                                <label
                                  className="custom-file-label"
                                  htmlFor="customFile2"
                                >
                                  {paymentSlipName
                                    ? paymentSlipName
                                    : "Choose file..."}
                                </label>
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>

                        <Col sm={6} className="form-group">
                          <label htmlFor="feInputZip">
                            Credit:{" "}
                            {credit > creditLimit ? (
                              <span style={{ color: "#ff0000" }}>
                                OVER THE LIMIT
                              </span>
                            ) : (
                              <span style={{ color: "#008000" }}>
                                UNDER THE LIMIT
                              </span>
                            )}
                          </label>
                          <FormInput id="feInputZip" value={credit} disabled />
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

                      <Row
                        form
                        className="mt-1"
                        style={{ alignItems: "flex-end" }}
                      >
                        <Col
                          md="12"
                          style={{
                            borderTop: "1px solid #d1d1d1",
                            margin: "15px 0"
                          }}
                        ></Col>
                        <>
                          <Col md="5" sm={7} xs={8} className="form-group">
                            <label htmlFor="feEmailAddress">Product Name</label>
                            <FormInput
                              id="feName"
                              type="text"
                              onChange={e => setProductName(e.target.value)}
                            />
                          </Col>
                          <Col md="4" sm={4} xs={4} className="form-group">
                            <label htmlFor="feInputZip">Quantity</label>
                            <FormInput
                              id="feInputZip"
                              onChange={e => {
                                setQuantity(e.target.value);
                                setDiscountAmount(
                                  (discountPercentage / 100) *
                                    e.target.value *
                                    unitPrice
                                );
                                setTotalAmount(e.target.value * unitPrice);
                              }}
                            />
                          </Col>
                          <Col md="3" sm={4} xs={5} className="form-group">
                            <label htmlFor="feInputZip">Unit Price</label>
                            <FormInput
                              id="feInputZip"
                              onChange={e => {
                                setUnitPrice(e.target.value);
                                setDiscountAmount(
                                  (discountPercentage / 100) *
                                    quantity *
                                    e.target.value
                                );
                                setTotalAmount(quantity * e.target.value);
                              }}
                            />
                          </Col>

                          <Col md="3" sm={4} xs={5} className="form-group">
                            <label htmlFor="feInputZip">
                              Discount Percentage
                            </label>
                            <FormInput
                              id="feInputZip"
                              type="number"
                              onChange={e => {
                                setDiscountPercentage(e.target.value);
                                setDiscountAmount(
                                  (e.target.value / 100) * quantity * unitPrice
                                );
                                setTotalAmount(quantity * unitPrice);
                              }}
                            />
                          </Col>

                          <Col md="3" sm={4} xs={5} className="form-group">
                            <label htmlFor="feInputZip">Discount Amount</label>
                            <FormInput
                              id="feInputZip"
                              value={discountAmount}
                              disabled
                            />
                          </Col>
                          <Col md="4" sm={4} xs={5} className="form-group">
                            <label htmlFor="feInputZip">Total Amount</label>
                            <FormInput
                              id="feInputZip"
                              value={totalAmount}
                              disabled
                            />
                          </Col>
                        </>
                        <button
                          className="btn btn-secondary"
                          style={{
                            padding: 0,
                            height: "33px",
                            width: "33px",
                            borderRadius: "99%",
                            marginBottom: "18px"
                          }}
                          onClick={e => handleAddClick(e)}
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        <Col
                          md="12"
                          style={{
                            borderTop: "1px solid #d1d1d1",
                            margin: "15px 0"
                          }}
                        ></Col>

                        {/* Mapping of Invoice data */
                        invoiceItems.map((item, index) => {
                          return (
                            <>
                              <Col md="5" sm={7} xs={8} className="form-group">
                                <label htmlFor="feEmailAddress">
                                  Product Name
                                </label>
                                <FormInput
                                  id="feName"
                                  type="text"
                                  className="product-name"
                                  value={
                                    invoiceItems[index].editing
                                      ? editProductName
                                      : invoiceItems[index].product_name
                                  }
                                  onChange={e =>
                                    setEditProductName(e.target.value)
                                  }
                                  disabled={
                                    invoiceItems[index].editing ? false : true
                                  }
                                />
                              </Col>

                              <Col md="4" sm={4} xs={4} className="form-group">
                                <label htmlFor="feInputZip">Quantity</label>
                                <FormInput
                                  id="feInputZip"
                                  className="quantity"
                                  value={
                                    invoiceItems[index].editing
                                      ? editQuantity
                                      : invoiceItems[index].quantity
                                  }
                                  onChange={e => {
                                    setEditQuantity(e.target.value);
                                    setEditDiscountAmount(
                                      (editDiscountPercentage / 100) *
                                        e.target.value *
                                        editUnitPrice
                                    );
                                    setEditTotalAmount(
                                      e.target.value * editUnitPrice
                                    );
                                  }}
                                  disabled={
                                    invoiceItems[index].editing ? false : true
                                  }
                                />
                              </Col>

                              <Col md="3" sm={4} xs={5} className="form-group">
                                <label htmlFor="feInputZip">Unit Price</label>
                                <FormInput
                                  className="unit-price"
                                  id="feInputZip"
                                  value={
                                    invoiceItems[index].editing
                                      ? editUnitPrice
                                      : invoiceItems[index].rate
                                  }
                                  onChange={e => {
                                    setEditUnitPrice(e.target.value);
                                    setEditDiscountAmount(
                                      (editDiscountPercentage / 100) *
                                        editQuantity *
                                        e.target.value
                                    );
                                    setEditTotalAmount(
                                      editQuantity * e.target.value
                                    );
                                  }}
                                  disabled={
                                    invoiceItems[index].editing ? false : true
                                  }
                                />
                              </Col>

                              <Col md="3" sm={4} xs={5} className="form-group">
                                <label htmlFor="feInputZip">
                                  Discount Percentage
                                </label>
                                <FormInput
                                  className="discount-percentage"
                                  id="feInputZip"
                                  type="number"
                                  value={
                                    invoiceItems[index].editing
                                      ? editDiscountPercentage
                                      : invoiceItems[index].discount_percentage
                                  }
                                  onChange={e => {
                                    setEditDiscountPercentage(e.target.value);
                                    setEditDiscountAmount(
                                      (e.target.value / 100) *
                                        editQuantity *
                                        editUnitPrice
                                    );
                                    setEditTotalAmount(
                                      editQuantity * editUnitPrice
                                    );
                                  }}
                                  disabled={
                                    invoiceItems[index].editing ? false : true
                                  }
                                />
                              </Col>

                              <Col md="3" sm={4} xs={5} className="form-group">
                                <label htmlFor="feInputZip">
                                  Discount Amount
                                </label>
                                <FormInput
                                  id="feInputZip"
                                  placeholder={
                                    invoiceItems[index].editing
                                      ? editDiscountAmount
                                      : invoiceItems[index].discount_amount
                                  }
                                  disabled
                                />
                              </Col>

                              <Col md="4" sm={4} xs={5} className="form-group">
                                <label htmlFor="feInputZip">Total Amount</label>
                                <FormInput
                                  id="feInputZip"
                                  disabled
                                  placeholder={
                                    invoiceItems[index].editing
                                      ? editTotalAmount
                                      : invoiceItems[index].total_amount
                                  }
                                />
                              </Col>

                              <button
                                className="btn btn-secondary me-1"
                                style={{
                                  padding: 0,
                                  height: "33px",
                                  width: "33px",
                                  borderRadius: "99%",
                                  marginBottom: "18px"
                                }}
                                onClick={e => handleDeleteClick(item.id, e)}
                              >
                                <i
                                  className="fa fa-minus"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <Button
                                style={{ marginBottom: 17, marginLeft: 5 }}
                                onClick={e => {
                                  setUpdateMessage(false);
                                  if (!editing) {
                                    e.preventDefault();
                                    setEditing(true);
                                    invoiceItems[index].editing = true;
                                    collectData(index);
                                  }
                                }}
                              >
                                Edit
                              </Button>

                              {invoiceItems[index].editing ? (
                                <Button
                                  style={{ marginBottom: 17, marginLeft: 5 }}
                                  onClick={e => {
                                    if (editing) {
                                      e.preventDefault();
                                      handleEdit(e, index);
                                      setEditing(false);
                                      invoiceItems[index].editing = false;
                                    }
                                  }}
                                >
                                  Save
                                </Button>
                              ) : null}

                              <Col
                                md="12"
                                style={{
                                  borderTop: "1px solid #d1d1d1",
                                  margin: "15px 0"
                                }}
                              ></Col>
                            </>
                          );
                        })}
                      </Row>

                      <h5 className="my-2">Gross Total: {grossTotal}</h5>
                      <h5 className="my-2">Total Discount: {totalDiscount}</h5>
                      <h4 className="my-2 mb-4">Net Total: {netTotal}</h4>
                      {updateMessage ? (
                        <h6 style={{ color: "#00cc00" }}>Updated</h6>
                      ) : (
                        <h6 style={{ color: "#f2000d" }}>Not Updated</h6>
                      )}
                      <Button
                        onClick={e => {
                          if (editing) {
                            window.alert("Save all items first!");
                            e.preventDefault();
                          } else {
                            handleNetTotal();
                            console.log(invoiceItems);
                          }
                        }}
                      >
                        Generate Net Amount
                      </Button>
                      <br></br>
                      <Button
                        type="submit"
                        className="mt-2"
                        onClick={e => {
                          if (editing) {
                            window.alert("Save all items first!");
                            e.preventDefault();
                          } else {
                            updateMessage
                              ? handleInvoiceCreation(e)
                              : window.alert(
                                  "Net total has not been updated! Check if Net Total is correct."
                                );
                            e.preventDefault();
                            handleNetTotal();
                          }
                        }}
                      >
                        Update Invoice
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditOrder;
