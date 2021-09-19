import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { Row, Container } from 'reactstrap';
import CommonLayout from '../layout/CommonLayout';
// Components
import CartItem from "./CartItem";

// Actions
import { addToCart, removeFromCart } from "../../actions/cartActions";

const CartScreen = (cartItems) => {
  const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;
//console.log('Hello WOrld==>',cartItems.cartItems)   
  useEffect(() => {}, []);

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

  return (
    <CommonLayout title="Cart" parent="Home">
      <section className="section-b-space">
        <Container>
          <Row>
            <div className="cartscreen">
              <div className="cartscreen__left">
                <h2>Shopping Cart</h2>

                { cartItems.cartItems.length === 0 ? (
                  <div>
                    Your Cart Is Empty <Link to="/">Go Back</Link>
                  </div>
                ) : (
                  cartItems.cartItems.map((item) => (
                    <CartItem
                      key={item.product}
                      item={item}
                      qtyChangeHandler={qtyChangeHandler}
                      removeHandler={removeFromCartHandler}
                    />
                  ))
                )}
              </div>

              <div className="cartscreen__right">
                <div className="cartscreen__info">
                  <p>Subtotal ({getCartCount()}) items</p>
                  <p>${getCartSubTotal()}</p>
                </div>
                <div>
                  <button>Proceed To Checkout</button>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

//export default CartScreen;
const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems
  });
  
  export default connect(mapStateToProps, {  })(CartScreen);
