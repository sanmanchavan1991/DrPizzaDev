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

const RegisterModal = ({ isAuthenticated, error, register, clearErrors }) => {
  const [modal, setModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState(null);

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
  };

  return (
    <div>
      {msg ? <Alert color="danger">{msg}</Alert> : null}
      <Form className="theme-form" onSubmit={handleOnSubmit}>
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
            <Col md="12">
              <button className="btn btn-solid" type="submit">
                Register
              </button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
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
