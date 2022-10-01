import React, { useEffect } from "react";
import { Col, Row, FormInput, Form } from "shards-react";
import { useFormik } from "formik";
var numeral = require('numeral');

const ReturnProductForm = ({ invoiceItems, setInvoiceItems, setError }) => {
  var arrayItems = [];

  let invoiceItem = {
    product_name: "",
    expire_date: "",
    reason_of_refund: "",
    sku: "",
    invoice_value: 0,
    mrp: 0,
    total_value: 0,
    comments: "",
    product_id: "",
    editing: false
  };

  useEffect(() => {
    formik.values.totalValue =
      formik.values.mrp * formik.values.quantity;
    if (formik.values.totalAmount != 0 || formik.values.totalAmount != 0) {
      formik.values.totalAmount = numeral(formik.values.totalAmount).format(
        "0[.]00"
      );
      formik.values.invoiceValue = numeral(
        formik.values.invoiceValue
      ).format("0[.]00");
    }
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      unitPrice: 0,
      expireDate: "",
      reasonOfRefund: "",
      sku: "",
      invoiceValue: 0,
      totalValue: 0,
      mrp: 0,
      comments: "",
    },
    validate: values => {
      const errors = {};

      if (!values.quantity) {
        values.quantity = 0;
      } else if (values.quantity % 1 !== 0) {
        errors.quantity = "Quantity has to be a whole number";
      }
      if (!values.unitPrice) {
        values.unitPrice = 0;
      }
      if (!values.percentageDiscount) {
        values.percentageDiscount = 0;
      } else if (values.percentageDiscount>100){
        errors.percentageDiscount = "Percentage discount cannot be greater than 100";
      }
      if (!values.fixedDiscount) {
        values.fixedDiscount = 0;
      }
      setError(errors)
      return errors;
    },
    onSubmit: values => {
      var newItem = Object.create(invoiceItem);
      newItem.product_name = values.productName;
      newItem.quantity = Number(values.quantity);
      newItem.expire_date = values.expireDate;
      newItem.reason_of_refund = values.reasonOfRefund;
      newItem.sku = values.sku;
      newItem.invoice_value = Number(values.invoiceValue);
      newItem.mrp = Number(values.mrp);
      newItem.total_value = Number(values.totalValue);
      newItem.comments = values.comments;
      newItem.product_id = new Date().getTime();
      newItem.editing = false;

      arrayItems = [...invoiceItems, newItem];
      setInvoiceItems(arrayItems);
    }
  });

  return (
    <>
      <Form>
        <Row form className="mt-1" style={{ alignItems: "flex-end" }}>
          <Col
            md="12"
            style={{
              borderTop: "1px solid #d1d1d1",
              margin: "15px 0"
            }}
          ></Col>
          <Col md="6" sm={7} xs={8} className="form-group">
            <label htmlFor="productName">Product Name</label>
            <FormInput
              name="productName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.productName}
            />
          </Col>
          <Col md="3" sm={7} xs={8} className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <FormInput
              name="quantity"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.quantity}
            />
          </Col>
          <Col md="3" sm={7} xs={8} className="form-group">
            <label htmlFor="mrp">MRP</label>
            <FormInput
              name="mrp"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.mrp}
            />
          </Col>
          <Col md="3" sm={7} xs={8} className="form-group">
            <label htmlFor="invoiceValue">Invoice Value</label>
            <FormInput
              name="invoiceValue"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.invoiceValue}
            />
          </Col>
          <Col md="3" sm={7} xs={8} className="form-group">
            <label htmlFor="totalValue">Total Value</label>
            <FormInput
              name="totalValue"
              type="number"
              disabled
              onChange={formik.handleChange}
              value={formik.values.totalValue}
            />
          </Col>
          <Col md="3" sm={7} xs={8} className="form-group">
            <label htmlFor="expireDate">Expire Date</label>
            <FormInput
              name="expireDate"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.expireDate}
            />
          </Col>
          <Col md="3" sm={7} xs={8} className="form-group">
            <label htmlFor="reasonOfRefund">Reason of Refund</label>
            <FormInput
              name="reasonOfRefund"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.reasonOfRefund}
            />
          </Col>
          <Col md="5" sm={7} xs={8} className="form-group">
            <label htmlFor="sku">Every SKU checked by Company Representative</label>
            <FormInput
              name="sku"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.sku}
            />
          </Col>
          <Col md="5" sm={7} xs={8} className="form-group">
            <label htmlFor="comments">Comments</label>
            <FormInput
              name="comments"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.comments}
            />
          </Col>

          <button
            className="btn btn-secondary"
            style={{
              padding: 0,
              height: "33px",
              width: "33px",
              borderRadius: "100%",
              marginBottom: "18px"
            }}
            onClick={formik.handleSubmit}
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
        </Row>
      </Form>
    </>
  );
};

export default ReturnProductForm;
