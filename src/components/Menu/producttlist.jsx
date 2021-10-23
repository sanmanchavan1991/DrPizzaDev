import React, { useState, useContext, useEffect } from "react";
import './ProductList.css';
import { getMenus } from '../../Actions/MenuAction';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { login } from "../../Actions/authAction";
import { clearErrors } from "../../Actions/errorActions";


const ProductList = ({ getMenus, menus, colClass, layoutList, userAdmin }) => {
  const [selectedCurr, selectedCurrency] = useState({
    currency: "INR",
    symbol: "₹",
    value: 1,
  });
  const [error, setError] = useState()
  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCompare, setModalCompare] = useState(false);
  const toggleCompare = () => setModalCompare(!modalCompare);
  const toggle = () => setModal(!modal);
  const uniqueTags = [];
  const [grid, setGrid] = useState(colClass);
  const [layout, setLayout] = useState(layoutList);
  const [isAdminAccount, setIsAdminAccount] = useState(false);
  useEffect(() => {
    getMenus();
    if (userAdmin && userAdmin.isAdmin) {
      setIsAdminAccount(true);
    }
  }, [getMenus, isAdminAccount, userAdmin]);
  const onClickHandle = (img) => {
    setImage(img);
  };
  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };
  const clickProductDetail = () => {
    const titleProps = product.title.split(" ").join("");
    router.push(`/product-details/${product.id}` + "-" + `${titleProps}`);
  };
  const variantChangeByColor = (imgId, product_images) => {
    product_images.map((data) => {
      if (data.image_id == imgId) {
        setImage(data.src);
      }
    });
  };
  return (
    <div className="menu-container">
      <div className="row">
        {menus && menus.length > 0 && menus.map((product, i) =>
        (
          <div className="col-lg-6 col-sm-4">
            <div className="card-style">
              <div className="row">
                <div className="col-md-4">
                  <img src={`${image ? image : product.foodImage}`} class="img-fluid rounded-start image-style" alt="..." />
                </div>
                <div className="col-md-7">
                  <div className="card-body card-body-style">
                    <h5 className="card-title" style={{ fontSize: "28px", fontWeight: 'bold', color: "#F38404" }}>{product.foodName}</h5>
                    <p className="card-text">{product.foodDesc}</p>
                    <p className="card-text">Rs. {product.foodPrice}</p>
                    <p className="card-text"><small className="text-muted">Qty: {product.stockQuantity}</small></p>
                    <Link to={`/menu/${product._id}`} className="menu-view">
                      View
                    </Link>
                  </div>
                </div>
                <div className="col-md-1">
                  {isAdminAccount ?
                    <Link className="btn btn-outline btn-light" to={{
                      pathname: `/admin/`,
                      state: { fromProductDetails: true, pid: product._id }
                    }}>EDIT</Link> : ""}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

//export default ProductList;
const mapStateToProps = (state) => ({
  menus: state.menu.menus,
  isLoading: state.menu.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  userAdmin: state.auth.user,
});
export default connect(mapStateToProps, { getMenus })(ProductList);