import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/authAction";
import { clearErrors } from "../../actions/errorActions";
const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  uniqueTags,
  detailClass,
  title,
  des,
  variantChangeByColor,
  isAuthenticated, userAdmin, error, login, clearErrors 
}) => {
  const [qty, setQty] = useState(1);
  const [isAdminAccount, setIsAdminAccount] = useState(false);
  useEffect(() =>{
    if (userAdmin && userAdmin.isAdmin) {
      setIsAdminAccount(true);
    }
  }, [isAdminAccount, userAdmin])

  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div className="row">
        <div className="col-md-11">

        <h6>{product.foodName}</h6>
        <h6>{product.foodSize}</h6>
        {des ? <p>{product.foodDesc}</p> : ""}
        <h4>
          {currency.symbol}
          {(
            (product.foodPrice - (product.foodPrice * 1) / 100) *
            currency.value
            ).toFixed(2)}

        </h4>
        <h6>
        <Link to={`/menu/${product._id}`} className="info__button">
          View
        </Link>
        </h6>
        </div>
      
        <div className="col-md-1">
        {isAdminAccount ?
          <Link className="btn btn-outline btn-light" to={{
            pathname: `/admin/`,
            state: { fromProductDetails: true, pid: product._id }
          }}>EDIT</Link> : "" }
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userAdmin: state.auth.user,
  error: state.error,
});
export default connect(mapStateToProps, { login, clearErrors })(MasterProductDetail);
