import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import supabase from "../../utils/supabase";
import Loading from "../../components/Loading/Loading";
import useLocalStorage from "../Hooks/useLocalStorage";

const EditDistributor = ({ match }) => {
  const [profile, setProfile] = useState({});
  const [distributorId, setDistributorId] = useState("");
  //   const [territoryId, setTerritoryId] = useState('');
  //   const [zoneId, setZoneId] = useState('');
  //   const [divisionId, setDivisionId] = useState('');

  const [businessName, setBusinessName] = useLocalStorage("businessName", "");
  const [proprietorName, setProprietorName] = useLocalStorage("proprietorName", "");
  const [phoneNumber, setPhoneNumber] = useLocalStorage("phoneNumber", "");
  const [businessType, setBusinessType] = useLocalStorage("businessType", 'A');
  const [creditLimit, setCreditLimit] = useLocalStorage("creditLimit", 0);
  const [permanentAddress, setPermanentAddress] = useLocalStorage("permanentAddress", "");
  const [presentAddress, setPresentAddress] = useLocalStorage("presentAddress", "");

  //documents
  const [photoPath, setPhotoPath] = useLocalStorage("photoPath", null)
  const [photoName, setPhotoName] = useLocalStorage("photoName", '')
  const [applicationPath, setApplicationPath] = useLocalStorage("applicationPath", null)
  const [applicationName, setApplicationName] = useLocalStorage("applicationName", '')
  const [deedPath, setDeedPath] = useLocalStorage("deedPath", null)
  const [deedName, setDeedName] = useLocalStorage("deedName", '')
  const [tinPath, setTinPath] = useLocalStorage("tinPath", null)
  const [tinName, setTinName] = useLocalStorage("tinName", '')
  const [nidPath, setNidPath] = useLocalStorage("nidPath", null)
  const [nidName, setNidName] = useLocalStorage("nidName", '')
  const [tradeLicensePath, setTradeLicensePath] = useLocalStorage("tradeLicensePath", null)
  const [tradeLicenseName, setTradeLicenseName] = useLocalStorage("tradeLicenseName", '')
  const [salvageCertificatePath, setSalvageCertificatePath] = useLocalStorage("salvageCertificatePath", null)
  const [salvageCertificateName, setSalvageCertificateName] = useLocalStorage("salvageCertificateName", '')
  const [bankStatementPath, setBankStatementPath] = useLocalStorage("bankStatementPath", null)
  const [bankStatementName, setBankStatementName] = useLocalStorage("bankStatementName", '')
  const [agreementPath, setAgreementPath] = useLocalStorage("agreementPath", null)
  const [agreementName, setAgreementName] = useLocalStorage("agreementName", '')
  const [chequePath, setChequePath] = useLocalStorage("chequePath", null)
  const [chequeName, setChequeName] = useLocalStorage("chequeName", '')
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const user = supabase.auth.user();

  useEffect(() => {
    async function fetchData() {
      let { data: profile, error1 } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id);

      if (error1) {
        console.log(error1);
      } else {
        console.log(profile[0]);
        setProfile(profile[0]);
      }

      let { data: distributors, error } = await supabase
        .from("distributors")
        .select("*")
        .eq("id", parseInt(match.params.id));
      if (error) {
        console.log(error);
      } else {
        setLoading(false);
        console.log(distributors);
        setDistributorId(distributors[0].id);

        setBusinessName(distributors[0].business_name);
        setProprietorName(distributors[0].proprietor_name);
        setPermanentAddress(distributors[0].permanent_address);
        setPresentAddress(distributors[0].present_address);
        setPhoneNumber(distributors[0].phone);
        setBusinessType(distributors[0].business_type);
        setCreditLimit(distributors[0].credit_limit);
        setPhotoPath(distributors[0].picture_path);
        setApplicationPath(distributors[0].application_path);
        setDeedPath(distributors[0].deed_path);
        setNidPath(distributors[0].nid_path);
        setTradeLicensePath(distributors[0].trade_license_path);
        setSalvageCertificatePath(distributors[0].salvage_certificate_path);
        setBankStatementPath(distributors[0].bank_statement_path);
        setAgreementPath(distributors[0].agreement_path);
        setChequePath(distributors[0].cheque_path);

        // path names
        setPhotoName(
          distributors[0].picture_path
            ? distributors[0].picture_path.split(".")[0]
            : ""
        );
        setApplicationName(
          distributors[0].application_path
            ? distributors[0].application_path.split(".")[0]
            : ""
        );
        setDeedName(
          distributors[0].deed_path
            ? distributors[0].deed_path.split(".")[0]
            : ""
        );
        setNidName(
          distributors[0].nid_path ? distributors[0].nid_path.split(".")[0] : ""
        );
        setTradeLicenseName(
          distributors[0].trade_license_path
            ? distributors[0].trade_license_path.split(".")[0]
            : ""
        );
        setSalvageCertificateName(
          distributors[0].salvage_certificate_path
            ? distributors[0].salvage_certificate_path.split(".")[0]
            : ""
        );
        setBankStatementName(
          distributors[0].bank_statement_path
            ? distributors[0].bank_statement_path.split(".")[0]
            : ""
        );
        setAgreementName(
          distributors[0].agreement_path
            ? distributors[0].agreement_path.split(".")[0]
            : ""
        );
        setChequeName(
          distributors[0].cheque_path
            ? distributors[0].cheque_path.split(".")[0]
            : ""
        );
      }
    }
    fetchData();
  }, [match]);

  async function handleClick(event) {
    event.preventDefault();

    const { data, error } = await supabase
      .from("distributors")
      .update({
        business_name: businessName,
        proprietor_name: proprietorName,
        present_address: presentAddress,
        permanent_address: permanentAddress,
        phone: phoneNumber,
        business_type: businessType,
        credit_limit: creditLimit,
        picture_path: photoPath,
        application_path: applicationPath,
        deed_path: deedPath,
        nid_path: nidPath,
        trade_license_path: tradeLicensePath,
        salvage_certificate_path: salvageCertificatePath,
        bank_statement_path: bankStatementPath,
        agreement_path: agreementPath,
        cheque_path: chequePath
      })
      .eq("id", distributorId);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      history.push("/distributors");
    }
  }

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
      } else {
        if (documentType === "photo") {
          setPhotoName(fileName);
          setPhotoPath(filePath);
        }

        if (documentType == "application") {
          setApplicationName(fileName);
          setApplicationPath(filePath);
        }

        if (documentType == "deed") {
          setDeedName(fileName);
          setDeedPath(filePath);
        }

        if (documentType == "tin") {
          setTinName(fileName);
          setTinPath(filePath);
        }

        if (documentType == "nid") {
          setNidName(fileName);
          setNidPath(filePath);
        }

        if (documentType == "tradeLicense") {
          setTradeLicenseName(fileName);
          setTradeLicensePath(filePath);
        }

        if (documentType == "salvageCertificate") {
          setSalvageCertificateName(fileName);
          setSalvageCertificatePath(filePath);
        }

        if (documentType == "bankStatement") {
          setBankStatementName(fileName);
          setBankStatementPath(filePath);
        }

        if (documentType == "agreement") {
          setAgreementName(fileName);
          setAgreementPath(filePath);
        }

        if (documentType == "cheque") {
          setChequeName(fileName);
          setChequePath(filePath);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // name, address, phone number, business type (dropdown: electric, furniture)

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <Container fluid className="main-content-container px-4 pb-5">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="12"
          title="Edit a Dealer"
          subtitle="Dealers"
          className="text-sm-left"
        />
      </Row>

      <Row>
        <Col lg="8" className="mb-6">
          <Card small>
            <ListGroup flush>
              <ListGroupItem className="p-4">
                <Row>
                  <Col>
                    <Form>
                      <FormGroup>
                        <label htmlFor="feInputName">Business Name</label>
                        <FormInput
                          id="feInputName"
                          placeholder="Enter business's name"
                          type="text"
                          value={businessName}
                          onChange={e => {
                            setBusinessName(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Proprietor's Name</label>
                        <FormInput
                          id="feInputName"
                          placeholder="Enter proprietor's name"
                          type="text"
                          value={proprietorName}
                          onChange={e => {
                            setProprietorName(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputAddress">Present Address</label>
                        <FormInput
                          id="feInputAddress"
                          placeholder="Enter dealer's address"
                          value={presentAddress}
                          onChange={e => {
                            setPresentAddress(e.target.value);
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputAddress">Permanent Address</label>
                        <FormInput
                          id="feInputAddress"
                          placeholder="Enter dealer's address"
                          value={permanentAddress}
                          onChange={e => {
                            setPermanentAddress(e.target.value);
                          }}
                        />
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="feInputTel">Credit Limit</label>
                        <FormInput
                          id="feInputTel"
                          placeholder="Enter dealer's phone number"
                          type="number"
                          value={creditLimit}
                          onChange={e => {
                            setCreditLimit(e.target.value);
                          }}
                        />
                      </FormGroup>

                      <Row form>
                        <Col md="8" className="form-group">
                          <label htmlFor="feInputTel">Phone Number</label>
                          <FormInput
                            id="feInputTel"
                            placeholder="Enter dealer's phone number"
                            value={phoneNumber}
                            onChange={e => {
                              setPhoneNumber(e.target.value);
                            }}
                          />
                        </Col>
                        <Col md="4" className="form-group">
                          <label htmlFor="feInputState">
                            Business Category
                          </label>
                          <FormSelect
                            id="feInputState"
                            value={businessType}
                            onChange={e => setBusinessType(e.target.value)}
                          >
                            <option style={{ height: "20px" }} value="A">
                              A
                            </option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                          </FormSelect>
                        </Col>
                      </Row>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Picture</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e => uploadDocument(e, "photo")}
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {photoName ? photoName : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Application</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e => uploadDocument(e, "application")}
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {applicationName
                              ? applicationName
                              : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Deed</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e => uploadDocument(e, "deed")}
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {deedName ? deedName : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload TIN</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e => uploadDocument(e, "tin")}
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {tinName ? tinName : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload NID</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e => uploadDocument(e, "nid")}
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {nidName ? nidName : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">
                          Upload Trade License
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e => uploadDocument(e, "tradeLicense")}
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {tradeLicenseName
                              ? tradeLicenseName
                              : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">
                          Upload salvage Certificate
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e =>
                              uploadDocument(e, "salvageCertificate")
                            }
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {salvageCertificateName
                              ? salvageCertificateName
                              : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">
                          Upload Bank Statement
                        </label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e => uploadDocument(e, "bankStatement")}
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {bankStatementName
                              ? bankStatementName
                              : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>
                      <FormGroup>
                        <label htmlFor="feInputName">Upload Agreement</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e => uploadDocument(e, "agreement")}
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {agreementName ? agreementName : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="feInputName">Upload Cheque</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            accept=".png,.jpg,.pdf"
                            className="custom-file-input"
                            id="customFile2"
                            onChange={e => uploadDocument(e, "cheque")}
                            // value={profilePicture}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customFile2"
                          >
                            {chequeName ? chequeName : "Choose file..."}
                          </label>
                        </div>
                      </FormGroup>
                      <Button
                        type="submit"
                        onClick={handleClick}
                      >
                        Update Dealer
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

export default EditDistributor;
