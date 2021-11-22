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
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from "reactstrap";
import './Login.css'
import { ReactComponent as PizzaSvg } from '../../assets/images/authenticate/undraw_pizza_sharing_wxop.svg'
import { connect } from "react-redux";
import { login } from "../../Actions/authAction";
import { clearErrors } from "../../Actions/errorActions";
import CommonLayout from "../Layout/commonLayout";
import { useHistory } from "react-router-dom";
import HomePagePizzaImg from '../../assets/images/HomePage/home-pizza.jpg';

const LoginModal = ({
  isAuthenticated,
  isAdmin,
  error,
  login,
  clearErrors,
}) => {
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
    } else if (error.id === "LOGIN_SUCCESS") {
      setMsg("Login Successful!");
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
  const handleClickForgotPass = () => {
    history.push("/forgotPassword");
  };
  const handleOnRegister = () => {
    history.push("/register");
  };
  console.log("isAdmin==>", isAdmin);
  return (
    <div style={{ display: 'block', margin: '0 auto' }}>
      <Card className="login-card-style">
        <PizzaSvg className="Pizza-svg" />
        <hr className="hr-style" />
        <CardBody className="card-body">
          <Form className="theme-form">
            <FormGroup>
              <Row>
                <Col md="12" sm>
                  <Label for="email" style={{ color: '#F38404', marginBottom: '8px' }}>Email</Label>
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
                <Col md="12">
                  <Label for="password" style={{ color: '#F38404', margin: '8px 0' }}>Password</Label>
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
              </Row>{" "}
              <Row>
                <Col md="4"></Col>
                <Col md="5" style={{ margin: '18px 0 18px 18px' }}>
                  <a
                    style={{ textDecoration: "none", color: '#fff' }}
                    onClick={handleClickForgotPass}
                  >
                    Forgot password?
                  </a>
                </Col>
              </Row>
              <Row>
                <Col md="3"></Col>
                <Col md="4" sm="12">
                  <button
                    className="btn btn-danger"
                    type="submit"
                    onClick={handleOnSubmit}
                  >
                    Login
                  </button>
                </Col>
                <Col md="4" sm="12">
                  <button
                    className="btn btn-success"
                    type="submit"
                    onClick={handleOnRegister}
                  >
                    Sign Up
                  </button>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>

    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
