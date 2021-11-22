import "./cartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { Row, Container, Col } from 'reactstrap';
import CommonLayout from '../Layout/commonLayout';
// Components
import CartItem from "./cartItem";

// Actions
import { addToCart, removeFromCart } from "../../Actions/cartActions";

const CartScreen = (cartItems) => {
  const dispatch = useDispatch();

  //   const cart = useSelector((state) => state.cart);
  //   const { cartItems } = cart;
  //console.log('Hello WOrld==>',cartItems.cartItems)   
  useEffect(() => { }, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems.cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };
  console.log('cart::', cartItems)
  return (
    <Container className="" style={{ textAlign: 'center', fontSize: '22px' }}>
      <div className="">
        {
          cartItems.cartItems.length === 0 ? (
            <>
              <div>
                Your Cart Is Empty
              </div>
              <Link to="/menus" style={{ color: '#f38404', textDecoration: 'none' }}>Go Back</Link>
            </>
          ) : (
            cartItems.cartItems.map((item) => (
              <>
                <CartItem
                  key={item.product}
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={removeFromCartHandler}
                />
              </>
            ))
          )
        }
        <div>
          <p>Subtotal ({getCartCount()}) items</p>
          <p>${getCartSubTotal()}</p>
        </div>
        <div>
          <button className="add-cart-btn">Proceed To Checkout</button>
        </div>
      </div >


    </Container >
  );
};

//export default CartScreen;
const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems
});

export default connect(mapStateToProps, {})(CartScreen);
