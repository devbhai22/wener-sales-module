import React from "react";
import { useEffect } from "react";
import { Col, FormInput, Button, Row } from "shards-react";
import { useFormik } from "formik";
var numeral = require("numeral");

const ProductList = ({
  invoiceItems,
  setInvoiceItems,
  editing,
  setEditing,
  handleNetTotal,
  setError
}) => {
  var arrayItems = [];

  function handleDeleteClick(e, id) {
    if (editing) {
      window.alert("Save all items first!");
      e.preventDefault();
    } else {
      e.preventDefault();
      arrayItems = [...invoiceItems].filter(item => item.product_id != id);
      setInvoiceItems(arrayItems);
    }
  }

  function collectData(index) {
    formik.values.productName = invoiceItems[index].product_name;
    formik.values.quantity = invoiceItems[index].quantity;
    formik.values.unitPrice = invoiceItems[index].rate;
    formik.values.totalAmount = invoiceItems[index].total_amount;
    formik.values.fixedDiscount = invoiceItems[index].fixed_discount;
    formik.values.percentageDiscount = invoiceItems[index].percentage_discount;
    formik.values.percentageDiscountAmount =
      invoiceItems[index].percentage_discount_amount;
    formik.values.discountAmount = invoiceItems[index].discount_amount;
    formik.values.netAmount = invoiceItems[index].net_amount;
  }

  function handleEdit(index, e) {
    if (Object.keys(formik.errors).length === 0) {
      e.preventDefault();
      invoiceItems[index].product_name = formik.values.productName;
      invoiceItems[index].quantity = Number(formik.values.quantity);
      invoiceItems[index].rate = Number(formik.values.unitPrice);
      invoiceItems[index].total_amount = Number(formik.values.totalAmount);
      invoiceItems[index].fixed_discount = Number(formik.values.fixedDiscount);
      invoiceItems[index].percentage_discount =
        formik.values.percentageDiscount;
      invoiceItems[index].percentage_discount_amount = Number(
        formik.values.percentageDiscountAmount
      );
      invoiceItems[index].discount_amount = Number(
        formik.values.discountAmount
      );
      invoiceItems[index].net_amount = Number(formik.values.netAmount);
      handleNetTotal();
      setEditing(false);
      invoiceItems[index].editing = false;
    } else {
      alert("Errors exist in the form");
    }
  }

  useEffect(() => {
    formik.values.totalAmount =
      formik.values.quantity * formik.values.unitPrice;
    formik.values.percentageDiscountAmount =
      (formik.values.percentageDiscount / 100) * formik.values.totalAmount;
    formik.values.discountAmount =
      formik.values.fixedDiscount + formik.values.percentageDiscountAmount;
    formik.values.netAmount =
      formik.values.totalAmount - formik.values.discountAmount;
    formik.values.netAmount = numeral(formik.values.netAmount).format("0[.]00");
    if (formik.values.netAmount != 0) {
      formik.values.totalAmount = numeral(formik.values.totalAmount).format(
        "0[.]00"
      );
      formik.values.discountAmount = numeral(
        formik.values.discountAmount
      ).format("0[.]00");
      formik.values.percentageDiscountAmount = numeral(
        formik.values.percentageDiscountAmount
      ).format("0[.]00");
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
      } else if (values.percentageDiscount > 100) {
        errors.percentageDiscount =
          "Percentage discount cannot be greater than 100";
      }
      if (!values.fixedDiscount) {
        values.fixedDiscount = 0;
      }
      setError(errors)
      return errors;
    }
  });

  return invoiceItems.map((item, index) => {
    return (
      <>
        <Col md="6" sm={7} xs={8} className="form-group">
          <label htmlFor="productName">Product Name</label>
          <FormInput
            name="productName"
            type="text"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.productName
                : invoiceItems[index].product_name
            }
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={4} className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <FormInput
            name="quantity"
            type="number"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.quantity
                : invoiceItems[index].quantity
            }
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="unitPrice">Unit Price</label>
          <FormInput
            name="unitPrice"
            type="number"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.unitPrice
                : invoiceItems[index].rate
            }
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="totalAmount">Total Amount</label>
          <FormInput
            name="unitPrice"
            type="number"
            value={invoiceItems[index].quantity * invoiceItems[index].rate}
            disabled
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="percentageDiscount">Percentage Discount</label>
          <FormInput
            name="percentageDiscount"
            type="number"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.percentageDiscount
                : invoiceItems[index].percentage_discount
            }
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="percentageDiscountAmount">
            Percentage Discount Amount
          </label>
          <FormInput
            name="percentageDiscountAmount"
            type="number"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.percentageDiscountAmount
                : invoiceItems[index].percentage_discount_amount
            }
            disabled
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="fixedDiscount">Fixed Discount</label>
          <FormInput
            name="fixedDiscount"
            type="number"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.fixedDiscount
                : invoiceItems[index].fixed_discount
            }
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="discountAmount">Discount Amount</label>
          <FormInput
            name="discountAmount"
            type="number"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.discountAmount
                : invoiceItems[index].discount_amount
            }
            disabled
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="netAmount">Net Amount</label>
          <FormInput
            name="productName"
            type="number"
            value={
              invoiceItems[index].editing
                ? formik.values.netAmount
                : invoiceItems[index].net_amount
            }
            disabled
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
          onClick={e => handleDeleteClick(e, item.product_id)}
        >
          <i className="fa fa-minus" aria-hidden="true"></i>
        </button>

        <Button
          style={{ marginBottom: 17, marginLeft: 5 }}
          onClick={e => {
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
                handleEdit(index, e);
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
  });
};

export default ProductList;
