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

const LoginModal = ({ isAuthenticated, error, register, clearErrors }) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

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

    const user = { email, password };

    // Attempt to login
    login(user);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
      {/* <CommonLayout parent="home" title="Register">
        <section className="contact-page section-b-space">
          <Container>
            <Row className="section-b-space">
              <Col lg="5"> */}
              <div className="col">
                {msg ? <Alert color="danger">{msg}</Alert> : null}
                <Form className="theme-form" >
                  <FormGroup>
                    <Row>
                      <Col md="6">
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

                      <Col md="12">
                        <button className="btn btn-solid" type="submit"  onClick={handleOnSubmit}>
                          Login
                        </button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Form>
                </div>
              {/* </Col>
            </Row>
          </Container>
        </section>
      </CommonLayout> */}
      <div className="col"></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
