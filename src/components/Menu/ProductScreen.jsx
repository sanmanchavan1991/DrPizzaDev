import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connect } from 'react-redux';

// Actions
import { getMenuDetails} from '../../actions/MenuAction';
// import { getProductDetails } from "../redux/actions/productActions";
 import { addToCart } from "../../actions/cartActions";

const ProductScreen = ({ getMenuDetails,menu,isLoading,error, match, history }) => {
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
useEffect(() => {if (menu && match.params.id !== menu._id) {
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
    <div className="productscreen">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img  alt={menu.foodName} /> 
            </div>
            <div className="left__info">
              <p className="left__name">Food Description</p>
              <p>Price: {menu.foodPrice}</p>
              <p>Description: {menu.foodDesc}</p>
              <p>Size: {menu.foodSize}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price:
                 <span>{selectedCurr.symbol} {menu.foodPrice}</span> 
              </p>
              <p>
                Status:
                <span>
                   {menu.stockQuantity > 0 ? "In Stock" : "Out of Stock"} 
                </span>
              </p>
              <p>
                Qty
                 <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(menu.stockQuantity).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select> 
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

//export default ProductScreen;
const mapStateToProps = (state) => ({
    menu: state.menuDetail.menu,
    isLoading: state.menuDetail.isLoading,
    error: state.menuDetail.error
  });
  
   export default connect(mapStateToProps, { getMenuDetails })(ProductScreen);