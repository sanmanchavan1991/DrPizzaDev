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
import { resetPassword } from "../../actions/resetPassAction";
import { clearErrors } from "../../actions/errorActions";
import CommonLayout from "../layout/CommonLayout";
import { useHistory,useParams } from "react-router-dom";

const ResetPassword = ({  error, resetPassword, clearErrors }) => {
  const [modal, setModal] = useState(false);
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  
  //const history = useHistory();
  let { token } = useParams();

  console.log("token==>",token);
  const handleToggle = useCallback(() => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);
  useEffect(() => {
    // Check for register error
    if (error.id === "PASSWORD_RESET_FAIL") {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }

    // If authenticated, close modal
    // if (modal) {
    //   if (isAuthenticated) {
    //     handleToggle();
    //   }
    // }
  }, [error, handleToggle,  modal]);

  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);
  // const handleChangePassword = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("saaaa");
    const user = {token, password };  
    console.log("sanman this.token==>",token);

    // Attempt to login
    resetPassword(user);
  };
//   const handleClickForgotPass = () => {
//     history.push("/forgotPassword");
//   };
//   const handleOnRegister = () => {
//     history.push("/register");
//   };
  console.log("msg==>", msg);

  return (
    <div>
      <CommonLayout parent="home" title="Forgot-Password">
        <section className="contact-page section-b-space">
          <Container>
            <Row className="section-b-space">
              <Col lg="7" className="login-page-left"></Col>
              <Col lg="1"></Col>
              <Col lg="4" className="login-box">
                {msg ? <span>{msg}</span> : null}

                <Form className="theme-form">
                  <FormGroup>
                    <Row>
                      <Col md="6" >
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
                      <Col md="6" >
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
                      <Col md="8">
                        <button
                          className="btn btn-solid"
                          type="submit"
                          onClick={handleOnSubmit}
                        >
                          Reset-Password
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
  error: state.error,
 // token:state.auth.token
});

export default connect(mapStateToProps, { resetPassword, clearErrors })(ResetPassword);
