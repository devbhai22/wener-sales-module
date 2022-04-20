import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  FormInput,
  Button,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem
} from "shards-react";
import supabase from "../utils/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      history.push("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      email: email + "@wenerbd.com",
      password: password
    });
    if (error) {
      console.log(error);
      setErrorMessage(error.message);
    } else {
      let profile = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id);
      console.log(profile);

      if (profile.data.length > 0 && profile.body[0].role === "zsm") {
        localStorage.setItem("name", profile.body[0].name);
        localStorage.setItem(
          "avatar_url",
          profile.body[0].profile_picture_path
        );
        // localStorage.setItem('email', email+'@mail.com')
        // localStorage.setItem('password', password)
        history.push("/dashboard");
      } else {
        supabase.auth.signOut().then(data => {
          setErrorMessage("This dashboard is for ZSM users only");
          console.log(data);
        });
      }
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "83vh"
      }}
    >
      <Row>
        <Col md={12}>
          <Card small>
            {/* Files & Dropdowns */}
            <CardHeader className="border-bottom">
              <h4 className="m-0">Login</h4>
            </CardHeader>

            <ListGroup flush>
              <ListGroupItem className="px-3">
                {errorMessage ? (
                  <p
                    style={{
                      marginBottom: "0px",
                      color: "red",
                      textAlign: "right"
                    }}
                  >
                    {errorMessage}
                  </p>
                ) : null}
                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="feEmailAddress">Email</label>
                    <FormInput
                      id="feEmailAddress"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Col>
                  <Col md="12">
                    <label htmlFor="fePassword">Password</label>
                    <FormInput
                      id="fePassword"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Col>
                  <Button
                    type="submit"
                    className="mt-3 mb-2"
                    onClick={handleLogin}
                  >
                    Log in to your Account
                  </Button>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
