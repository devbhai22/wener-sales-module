import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Container, FormInput, Button, Card, CardHeader, ListGroup, ListGroupItem } from "shards-react";
import supabase from '../utils/supabase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  const handleLogin = async() => {
    const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
    })

    if (error){
      console.log(error)
    } else {
      history.push('/dashboard')
    }
  }

  return (
    <Container
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '83vh' }}
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

                <Row form>
                  <Col md="12" className="form-group">
                    <label htmlFor="feEmailAddress">Email</label>
                    <FormInput
                      id="feEmailAddress"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e)=>{setEmail(e.target.value)}}
                    />
                  </Col>
                  <Col md="12">
                    <label htmlFor="fePassword">Password</label>
                    <FormInput
                      id="fePassword"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e)=>{setPassword(e.target.value)}}
                    />
                  </Col>
                  <Button type="submit" className='mt-3 mb-2' onClick={handleLogin}>Log in to your Account</Button>

                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>


    </Container>
  )

};

export default Login;