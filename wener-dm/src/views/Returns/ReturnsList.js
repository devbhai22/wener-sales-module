import React from "react";
import { useEffect } from "react";
import { Col, FormInput, Button, Row } from "shards-react";
import { useFormik } from "formik";
var numeral = require("numeral");

const ReturnsList = ({
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
    formik.values.mrp = invoiceItems[index].mrp;
    formik.values.invoiceValue = invoiceItems[index].invoice_value;
    formik.values.totalValue = invoiceItems[index].total_value;
    formik.values.expireDate = invoiceItems[index].expire_date;
    formik.values.reasonOfRefund = invoiceItems[index].reason_of_refund;
    formik.values.sku = invoiceItems[index].sku;
    formik.values.comments = invoiceItems[index].comments;
  }

  function handleEdit(index, e) {
    if (Object.keys(formik.errors).length === 0) {
      e.preventDefault();
      invoiceItems[index].product_name = formik.values.productName;
      invoiceItems[index].quantity = Number(formik.values.quantity);
      invoiceItems[index].mrp = Number(formik.values.mrp);
      invoiceItems[index].invoice_value = Number(formik.values.invoiceValue);
      invoiceItems[index].total_value = Number(formik.values.totalValue);
      invoiceItems[index].expire_date = formik.values.expireDate;
      invoiceItems[index].reason_of_refund = formik.values.reasonOfRefund
      invoiceItems[index].sku = formik.values.sku
      invoiceItems[index].comments = formik.values.comments
      handleNetTotal();
      setEditing(false);
      invoiceItems[index].editing = false;
    } else {
      alert("Errors exist in the form");
    }
  }

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
          <label htmlFor="mrp">MRP</label>
          <FormInput
            name="mrp"
            type="number"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.mrp
                : invoiceItems[index].mrp
            }
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="totalAmount">Invoice Value</label>
          <FormInput
            name="unitPrice"
            type="number"
            value={invoiceItems[index].invoice_value}
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="percentageDiscount">Total Value</label>
          <FormInput
            name="percentageDiscount"
            type="number"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.totalValue
                : invoiceItems[index].total_value
            }
            disabled
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="expireDate">
            Expire Date
          </label>
          <FormInput
            name="percentageDiscountAmount"
            type="date"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.expireDate
                : invoiceItems[index].expire_date
            }
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="reasonOfRefund">Reason of Refund</label>
          <FormInput
            name="reasonOfRefund"
            type="text"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.reasonOfRefund
                : invoiceItems[index].reason_of_refund
            }
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="discountAmount">Every SKU checked by Company Representative</label>
          <FormInput
            name="sku"
            type="text"
            onChange={formik.handleChange}
            value={
              invoiceItems[index].editing
                ? formik.values.sku
                : invoiceItems[index].sku
            }
            disabled={invoiceItems[index].editing ? false : true}
          />
        </Col>

        <Col md="3" sm={4} xs={5} className="form-group">
          <label htmlFor="netAmount">Comments</label>
          <FormInput
            name="comments"
            type="text"
            value={
              invoiceItems[index].editing
                ? formik.values.comments
                : invoiceItems[index].comments
            }
            disabled={invoiceItems[index].editing ? false : true}
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

export default ReturnsList;
