import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminPage from "./Admin";
import LoginModal from "../Auth/LoginModal";
import { connect } from "react-redux";
import { login } from "../../actions/authAction";
import { clearErrors } from "../../actions/errorActions";

const AdminCheck = ({
  isAuthenticated,
  userAdmin,
  error,
  login,
  clearErrors,
}) => {
  const [checkIfAdminHasLoggedIn, setCheckIfAdminHasLoggedIn] = useState(false);
  useEffect(() => {
    if (userAdmin && userAdmin.isAdmin) {
      setCheckIfAdminHasLoggedIn(true);
    }
  }, [checkIfAdminHasLoggedIn, userAdmin]);
  return <>{checkIfAdminHasLoggedIn ? <AdminPage /> : <LoginModal />}</>;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userAdmin: state.auth.user,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(AdminCheck);
