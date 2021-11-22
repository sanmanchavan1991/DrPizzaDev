import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';

// Actions
import { getMenuDetails } from '../../Actions/MenuAction';
// import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../../Actions/cartActions";

const ProductScreen = ({ getMenuDetails, menu, isLoading, error, match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const [selectedCurr, selectedCurrency] = useState({
    currency: "INR",
    symbol: "₹",
    value: 1,
  });

  //let tempOutOfStock=5;
  // let loading=false;
  // let error=false;
  // console.log('useSelector((state) => state.getMenuDetails)==>',useSelector((state) => state.getMenuDetails))

  // const menuDetail = useSelector((state) => state.getMenuDetails);
  // console.log('menuDetail==>',menuDetail)

  // console.log('id==>',match.params.id)
  // const { isLoading, error, menu } = menuDetail;
  useEffect(() => {
    if (menu && match.params.id !== menu._id) {
      getMenuDetails(match.params.id);
    }
  }, [getMenuDetails]);

  //   useEffect(() => {
  //     if (menu && match.params.id !== menu._id) {
  //       dispatch(getMenuDetails(match.params.id));
  //     }
  //   }, [dispatch, match, menu]);

  const addToCartHandler = () => {
    dispatch(addToCart(menu._id, qty));
    history.push(`/cart`);
  };

  return (
    <div className="container" style={{ fontSize: '16px' }}>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="main">
            <img className="food-image col-md-1" src={menu.foodImage} alt={menu.foodName} />
            <div className="col-md-4">
              <p style={{ color: '#e2293f', fontSize: '22px', textDecoration: 'underline' }}>{menu.foodName}</p>
              <p>Price: {selectedCurr.symbol} {menu.foodPrice}</p>
              <p>Description: {menu.foodDesc}</p>
              <p>Size: {menu.foodSize}</p>
            </div>
            <div className="col-md-5">
              <p>
                Status:
                <span>
                  {menu.stockQuantity > 0 ? " In Stock" : " Out of Stock"}
                </span>
              </p>
              <p>
                Quantity:
                <select style={{ marginLeft: '18px', backgroundColor: '#555', color: '#fff' }} value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(menu.stockQuantity).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" style={{ backgroundColor: '#41C485', border: 'none', padding: '8px' }} onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
          <hr />
        </>
      )
      }
    </div >
  );
};

//export default ProductScreen;
const mapStateToProps = (state) => ({
  menu: state.menuDetail.menu,
  isLoading: state.menuDetail.isLoading,
  error: state.menuDetail.error
});

export default connect(mapStateToProps, { getMenuDetails })(ProductScreen);