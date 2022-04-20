import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";
import MainFooter from "../components/layout/MainFooter";
import { useHistory } from "react-router-dom";
import supabase from '../utils/supabase'


const DefaultLayout = ({ children, noNavbar, noFooter, noSidebar }) => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  let history = useHistory()


  useEffect(() => {
    const user = supabase.auth.user()

    if (!user) {
      history.push('/login')
    }
    console.log(history.location.pathname);
    if (history.location.pathname == '/login' || history.location.pathname == '/logout') {
      setIsLoginPage(true)
    }
  }, [history]);


  return (
    <Container fluid>
      <Row>
        {isLoginPage == false && !noSidebar && <MainSidebar />}
        <Col
          className="main-content p-0"
          lg={isLoginPage == false ? { size: 10, offset: 2 } : '12'}
          md={isLoginPage == false ? { size: 9, offset: 3 } : '12'}
          sm="12"
          tag="main"
        >
          {isLoginPage == false && !noNavbar && <MainNavbar />}
          {children}
          {isLoginPage == false && !noFooter && <MainFooter />}
        </Col>
      </Row>
    </Container>
  )
};

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool,
  noSidebar: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false,
  noSidebar: false
};

export default DefaultLayout;
