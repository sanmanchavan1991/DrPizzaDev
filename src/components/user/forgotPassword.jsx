import React, { Fragment,useState, useCallback, useEffect } from "react";
import {
  Container,
  Row
} from "reactstrap";
import "./forgotPassword.css";

import CommonLayout from "../layout/commonLayout";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {  clearErrors, forgotPassword } from "../../actions/userAction";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData  from "../layout/MetaData/MetaData";

const ForgotPassword = () => {

    const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };
  const { error, isLoading, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      alert.success(message);
    }
  });
  return (
    <Fragment>
      <CommonLayout parent="home" title="Forgot Password">
        <section className="contact-page section-b-space">
          <Container>
            <Row className="section-b-space">
              {isLoading ? (
                <Loader />
              ) : (
                <Fragment>
                  <MetaData title="Forgot Password" />
                  <div className="forgotPasswordContainer">
                    <div className="forgotPasswordBox">
                     <h2 className="forgotPasswordHeading">Forgot Password</h2>

                    <form
                        className="forgotPasswordForm"
                        onSubmit={forgotPasswordSubmit}
                    >
                        <div className="forgotPasswordEmail">
                        <MailOutlineIcon />
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>

                        <input
                        type="submit"
                        value="Send Reset-Link"
                        className="forgotPasswordBtn"
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
}


export default ForgotPassword;