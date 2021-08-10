import React, { useState, useCallback, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Media,
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import CommonLayout from "../layout/CommonLayout";

export const Authenticate = () => {

return (
    <div>
      <CommonLayout parent="home" title="Register">
        <section className="contact-page section-b-space">
          <Container>
            <Row className="section-b-space">
              <Col lg="5">
              <LoginModal/>
              </Col>
              <Col lg="7">
              <RegisterModal/>
              </Col>
            </Row>
          </Container>
        </section>
      </CommonLayout>
      </div>
);
}
export default Authenticate;