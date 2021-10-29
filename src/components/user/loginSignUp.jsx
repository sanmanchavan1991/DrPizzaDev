import React, { Fragment, useRef, useState, useEffect } from "react";
import "./loginSignUp.css";
import {
    Container,
    Row} from "reactstrap";
import CommonLayout from "../layout/commonLayout";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";

import PhoneIphone from "@material-ui/icons/PhoneIphone";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";

import MetaData  from "../layout/MetaData/MetaData";
const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");  

  const [signUpImage, setSignUpImage] = useState("/img/Profile.png");
  const [signUpImagePreview, setSignUpImagePreview] = useState("/img/Profile.png");


  const handleOnLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const setupImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setSignUpImagePreview(reader.result);
          setSignUpImage(reader.result);
          console.log('online image==>',reader.result)
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const handleOnRegisterSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", signUpName);
    myForm.set("email", signUpEmail);
    myForm.set("password", signUpPassword);
    myForm.set("phone", signUpPhone);
    myForm.set("photo", signUpImage);
    dispatch(register(myForm));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);


  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      <CommonLayout parent="home" title="Login/Register">
        <section className="contact-page section-b-space">
          <Container>
            <Row className="section-b-space">
              {isLoading ? (
                <Loader />
              ) : (
                <Fragment>
                  <MetaData title="Login/Register" />
                  <div className="LoginSignUpContainer">
                    <div className="LoginSignUpBox">
                      <div>
                        <div className="login_signUp_toggle">
                          <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                          <p onClick={(e) => switchTabs(e, "register")}>
                            REGISTER
                          </p>
                        </div>
                        <button ref={switcherTab}></button>
                      </div>
                      <form
                        className="loginForm"
                        ref={loginTab}
                        onSubmit={handleOnLoginSubmit}
                      >
                        <div className="loginEmail">
                          <MailOutlineIcon />
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                          />
                        </div>
                        <div className="loginPassword">
                          <LockOpenIcon />
                          <input
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                          />
                        </div>
                        <Link to="/forgotPassword">Forget Password ?</Link>
                        <input
                          type="submit"
                          value="Login"
                          className="loginBtn"
                        />
                      </form>
                      <form
                        className="signUpForm"
                        ref={registerTab}
                        encType="multipart/form-data"
                        onSubmit={handleOnRegisterSubmit}
                      >
                        <div className="signUpName">
                          <FaceIcon />
                          <input
                            type="text"
                            placeholder="Name"
                            required
                            name="signUpName"
                            value={signUpName}
                            onChange={(e) => setSignUpName(e.target.value)}
                          />
                        </div>
                        <div className="signUpEmail">
                          <MailOutlineIcon />
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            name="signUpEmail"
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                          />
                        </div>
                        <div className="signUpPhone">
                          <PhoneIphone />
                          <input
                            type="tel"
                            placeholder="Mobile Number"
                            required
                            name="signUpPhone"
                            value={signUpPhone}
                            // pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="10"  
                            // title="Ten digits code"
                            onChange={(e) => setSignUpPhone(e.target.value)}
                          />
                        </div>
                        <div className="signUpPassword">
                          <LockOpenIcon />
                          <input
                            type="password"
                            placeholder="Password"
                            required
                            name="signUpPassword"
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                          />
                        </div>

                        <div id="signUpImage">
                          <img src={signUpImagePreview} alt="Image Preview" />
                          <input
                            type="file"
                            name="signUpImage"
                            accept="image/*"
                            onChange={setupImage}
                          />
                        </div>
                        <input
                          type="submit"
                          value="Register"
                          className="signUpBtn"
                        />
                      </form>
                    </div>
                  </div>
                </Fragment>
              )}
            </Row>
          </Container>
        </section>
      </CommonLayout>
    </Fragment>
  );
};

export default LoginSignUp;
