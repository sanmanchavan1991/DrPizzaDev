
import React, { Fragment, useContext } from "react";
import { Media, Container, Row, Col, Input, Form, Button } from "reactstrap";
import LogoImage from "../Header/logo";
import NavBar from "../Header/navbar";

export const Navigation = (props) => {
  return (
    
    <Container>
          <Row>
            <Col> <NavBar /></Col>
          </Row>
        </Container>
  )
}
