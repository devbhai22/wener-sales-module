import React, { useEffect } from "react";
import { Col, Row, FormInput, Form, ListGroup, ListGroupItem } from "shards-react";
import { useFormik } from "formik";
var numeral = require('numeral');

const ProductForm = ({ invoiceItems, setInvoiceItems }) => {
  var arrayItems = [];

  let invoiceItem = {
    product_name: "",
    quantity: 0,
    rate: 0,
    total_amount: 0,
    fixed_discount: 0,
    percentage_discount: 0,
    percentage_discount_amount: 0,
    discount_amount: 0,
    net_amount: 0,
    product_id: 0,
    editing: false
  };

  useEffect(() => {
    formik.values.totalAmount =
      formik.values.quantity * formik.values.unitPrice;
    formik.values.percentageDiscountAmount =
      (formik.values.percentageDiscount / 100) * formik.values.totalAmount;
    formik.values.discountAmount =
      formik.values.fixedDiscount + formik.values.percentageDiscountAmount;
    formik.values.netAmount =
      formik.values.totalAmount - formik.values.discountAmount;
    formik.values.netAmount = numeral(formik.values.netAmount).format('0[.]00')
    if(formik.values.netAmount != 0){
    formik.values.totalAmount = numeral(formik.values.totalAmount).format('0[.]00')
    formik.values.discountAmount = numeral(formik.values.discountAmount).format('0[.]00')
    formik.values.percentageDiscountAmount = numeral(formik.values.percentageDiscountAmount).format('0[.]00')
    }
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      quantity: 0,
      unitPrice: 0,
      totalAmount: 0,
      fixedDiscount: 0,
      percentageDiscount: 0,
      percentageDiscountAmount: 0,
      discountAmount: 0,
      netAmount: 0
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
      if(values.netAmount<0){
        errors.netAmount = "Net amount cannot be negative";
      }
      return errors;
    },
    onSubmit: values => {
      var newItem = Object.create(invoiceItem);
      newItem.product_name = values.productName;
      newItem.quantity = values.quantity;
      newItem.rate = values.unitPrice;
      newItem.total_amount = Number(values.totalAmount);
      newItem.fixed_discount = values.fixedDiscount;
      newItem.percentage_discount = values.percentageDiscount;
      newItem.percentage_discount_amount = values.percentageDiscountAmount;
      newItem.discount_amount = Number(values.discountAmount);
      newItem.net_amount = Number(values.netAmount);
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
            <label htmlFor="unitPrice">Unit Price</label>
            <FormInput
              name="unitPrice"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.unitPrice}
            />
          </Col>
          <Col md="3" sm={4} xs={5} className="form-group">
            <label htmlFor="totalAmount">Total Amount</label>
            <FormInput
              name="totalAmount"
              type="number"
              value={formik.values.totalAmount}
              disabled
            />
          </Col>
          <Col md="3" sm={4} xs={5} className="form-group">
            <label htmlFor="percentageDiscount">Percentage Discount</label>
            <FormInput
              name="percentageDiscount"
              id="percentageDiscount"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.percentageDiscount}
            />
          </Col>
          <Col md="3" sm={4} xs={5} className="form-group">
            <label htmlFor="percentageDiscountAmount">
              Percentage Discount Amount
            </label>
            <FormInput
              name="percentageDiscountAmount"
              id="percentageDiscountAmount"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.percentageDiscountAmount}
              disabled
            />
          </Col>
          <Col md="3" sm={4} xs={5} className="form-group">
            <label htmlFor="fixedDiscount">Fixed Discount</label>
            <FormInput
              name="fixedDiscount"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.fixedDiscount}
            />
          </Col>
          <Col md="3" sm={4} xs={5} className="form-group">
            <label htmlFor="discountAmount">Discount Amount</label>
            <FormInput
              name="discountAmount"
              id="discountAmount"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.discountAmount}
              disabled
            />
          </Col>
          <Col md="3" sm={4} xs={5} className="form-group">
            <label htmlFor="netAmount">Net Amount</label>
            <FormInput
              type="number"
              name="netAmount"
              value={formik.values.netAmount}
              disabled
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
          <Col>
          <Row>
          {formik.errors.quantity ? (
            <div className="ml-2" style={{ color: "red" }}>
              {formik.errors.quantity}
            </div>
          ) : null}
          </Row>
          <Row>
          {formik.errors.percentageDiscount ? (
            <div className="ml-2" style={{ color: "red" }}>
              {formik.errors.percentageDiscount}
            </div>
          ) : null}
          </Row>
          <Row>
          {formik.errors.netAmount ? (
            <div className="ml-2" style={{ color: "red" }}>
              {formik.errors.netAmount}
            </div>
          ) : null}
          </Row>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ProductForm;
