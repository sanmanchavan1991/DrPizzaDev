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
import { register } from "../../actions/authAction";
import { clearErrors } from "../../actions/errorActions";
import CommonLayout from "../Layout/CommonLayout";
import { useHistory } from "react-router-dom";

const RegisterModal = ({ isAuthenticated, error, register, clearErrors }) => {
  const [modal, setModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const history = useHistory();

  const clearInput = () => {
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  const handleToggle = useCallback(() => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);
  useEffect(() => {
    // Check for register error
    if (error.id === "REGISTER_FAIL") {
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

  const handleChangeFullName = (e) => setFullName(e.target.value);
  const handleChangePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    let isError=false;
    if (password !== confirmPassword) {
      setMsg('confrim pass and pass is not matching');
      isError=true;
    }
    if(isError===false)
    {
    // Create user object
    const user = {
      fullName,
      phoneNumber,
      email,
      password,
    };
    console.log(user);
    // Attempt to login
    register(user);
  }
  };
  const handleLoginRedirect = () => {
    history.push("/login");
  };

  return (
    <div>
      <CommonLayout parent="home" title="Sign Up">
        <section className="contact-page section-b-space">
          <Container>
            <Row className="section-b-space">
              <Col lg="7" className="registration-page-left"></Col>
              <Col lg="1"></Col>
              <Col lg="4" className="login-box">
                {msg ? <span>{msg}</span> : null}
                <Form className="theme-form">
                  <FormGroup>
                    <Row>
                      <Col md="12">
                        <Label for="name">Full Name</Label>
                        <Input
                          type="text"
                          onChange={handleChangeFullName}
                          className="form-control"
                          id="fullName"
                          name="fullName"
                          placeholder="Enter Your full name"
                          required
                        />
                      </Col>
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
                      <Col md="6">
                        <Label for="phoneNumber">Phone number</Label>
                        <Input
                          type="text"
                          onChange={handleChangePhoneNumber}
                          className="form-control"
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Enter your number"
                          required
                          pattern="[0-9]*"
                        />
                      </Col>
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
                      <Col md="6">
                        <Label for="password">Re-Enter Password</Label>
                        <Input
                          type="password"
                          onChange={handleChangeConfirmPassword}
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Re-Enter Password"
                          required
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2">
                        <button
                          className="btn btn-solid"
                          type="submit"
                          onClick={handleOnSubmit}
                        >
                          Sign Up
                        </button>
                      </Col>
                      <Col md="2"></Col>
                      <Col md="4">
                        <button
                          className="btn btn-solid"
                          type="submit"
                          onClick={handleLoginRedirect}
                        >
                          Login
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

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
