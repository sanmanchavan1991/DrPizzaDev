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

import { connect } from "react-redux";
import { login } from "../../actions/authAction";
import { clearErrors } from "../../actions/errorActions";
import CommonLayout from "../layout/CommonLayout";
import { useHistory } from "react-router-dom";

const LoginModal = ({ isAuthenticated, error, login, clearErrors }) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  
  const history = useHistory();

  const clearInput = () => {
    setEmail("");
    setPassword("");
  };
  const handleToggle = useCallback(() => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);
  useEffect(() => {
    // Check for register error
    if (error.id === "LOGIN_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error, handleToggle, isAuthenticated, modal]);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("saaaa");
    const user = { email, password };

    // Attempt to login
    login(user);
  };
  const handleClickForgotPass = () => {
    history.push("/forgotPassword");
  };
  const handleOnRegister = () => {
    history.push("/register");
  };
  console.log("msg==>", msg);

  return (
    <div>
      <CommonLayout parent="home" title="Login">
        <section className="contact-page section-b-space">
          <Container>
            <Row className="section-b-space">
              <Col lg="7" className="login-page-left"></Col>
              <Col lg="1"></Col>
              <Col lg="4" className="login-box">
                {msg ? <span>{msg}</span> : null}
                {msg ? <span>{msg}</span> : null}

                <Form className="theme-form">
                  <FormGroup>
                    <Row>
                      <Col md="6" sm>
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          onChange={handleChangeEmail}
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter Your email"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <Label for="password">Password</Label>
                        <Input
                          type="password"
                          onChange={handleChangePassword}
                          className="form-control"
                          id="password"
                          name="password"
                          placeholder="Password"
                          required
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md="3"></Col>
                      <Col md="5">
                        <a
                          style={{ textDecoration: "none" }}
                          onClick={handleClickForgotPass}
                        >
                          Forgot password?
                        </a>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <button
                          className="btn btn-solid"
                          type="submit"
                          onClick={handleOnSubmit}
                        >
                          Login
                        </button>
                      </Col>
                      <Col md="1"></Col>
                      <Col md="4">
                        <button
                          className="btn btn-solid"
                          type="submit"
                          onClick={handleOnRegister}
                        >
                          Sign Up
                        </button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </section>
      </CommonLayout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
