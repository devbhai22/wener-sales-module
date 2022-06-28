import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Row, FormInput, FormSelect, FormTextarea } from "shards-react";
import supabase from "../utils/supabase";

const InvoiceInfo = ({ invoiceInfo, setInvoiceInfo }) => {
  const [transportName, setTransportName] = useState("");
  const [transportAddress, setTransportAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bkash");
  const [paymentMethods, setPaymentMethods] = useState([
    "Bkash",
    "Cheque",
    "Cash",
    "Mobile banking"
  ]);
  const [paymentSlipName, setPaymentSlipName] = useState("");
  const [paymentSlipPath, setPaymentSlipPath] = useState(null);
  const [executed, setExecuted] = useState(false)

  const mountFunction = () => {
    if (invoiceInfo.transport_name) {
      setTransportName(invoiceInfo.transport_name);
      setTransportAddress(invoiceInfo.transport_address);
      setNotes(invoiceInfo.notes);
      setPaymentMethod(invoiceInfo.payment_method);
      setPaymentSlipName(invoiceInfo.payment_slip_name);
      setPaymentSlipPath(invoiceInfo.payment_slip_path);
      console.log("Ok")
      setExecuted(true);
    }
  };

  useEffect(()=>{
    if (executed == false) {
      mountFunction();
    }
  })
  useEffect(() => {
    setInvoiceInfo({
      payment_method: paymentMethod,
      payment_slip_name: paymentSlipName,
      payment_slip_path: paymentSlipPath,
      transport_name: transportName,
      transport_address: transportAddress,
      notes: notes
    });
  }, [
    transportName,
    transportAddress,
    notes,
    paymentMethod,
    paymentMethods,
    paymentSlipName,
    paymentSlipPath
  ]);


  const uploadDocument = async (event, documentType) => {
    try {
      if (!event.target.files || event.target.files.length == 0) {
        throw "You must select an image to upload.";
      }

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

  return (
    <>
      <Row className="mb-2">
        <Col>
          <label htmlFor="paymentSlip">Upload Payment Slip</label>
          <div className="custom-file">
            <input
              type="file"
              accept=".png,.jpg,.pdf"
              className="custom-file-input"
              onChange={e => uploadDocument(e, "paymentSlip")}
            />
            <label className="custom-file-label">
              {paymentSlipName ? paymentSlipName : "Choose file..."}
            </label>
          </div>
        </Col>
        <Col>
          <label htmlFor="paymentMethod">Choose Payment Method</label>
          <FormSelect
            id="paymentMethod"
            value={paymentMethod}
            onChange={e => {
              setPaymentMethod(e.target.value);
            }}
          >
            {paymentMethods
              ? paymentMethods.map(thisPaymentMethod => (
                  <option key={thisPaymentMethod} value={thisPaymentMethod}>
                    {thisPaymentMethod}
                  </option>
                ))
              : null}
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <label htmlFor="transporttName">Transport Name</label>
          <FormInput
            name="transportName"
            onChange={e => setTransportName(e.target.value)}
            value={transportName}
          />
        </Col>
        <Col>
          <label htmlFor="transporttName">Transport Address</label>
          <FormInput
            name="transportAddress"
            onChange={e => setTransportAddress(e.target.value)}
            value={transportAddress}
          />
        </Col>
      </Row>
      <label htmlFor="notes">Notes</label>
      <FormTextarea
        id="notes"
        placeholder="Notes"
        type="text"
        value={notes}
        onChange={e => setNotes(e.target.value)}
      />
    </>
  );
};

export default InvoiceInfo;
