import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Row, Container } from "reactstrap";
import CommonLayout from "../layout/CommonLayout";
// Components
import CartItem from "./CartItem";

// Actions
import { addToCart, removeFromCart } from "../../actions/cartActions";
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
const CartScreen = (cartItems,user) => {
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

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    dispatch(addToCart(menu._id, qty));

    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    // const options = {
    //   key: "rzp_test_uGoq5ABJztRAhk" ,
    //   currency: data.currency,
    //   amount: data.amount.toString(),
    //   order_id: data.id,
    //   name: "Donation",
    //   description: "Thank you for nothing. Please give us some money",
    //   image: "http://localhost:1337/logo.svg",
    //   handler: function (response) {
    //     alert(response.razorpay_payment_id);
    //     alert(response.razorpay_order_id);
    //     alert(response.razorpay_signature);
    //   },
    //   prefill: {
    //     name:user?.username,
    //     email: user?.email,
    //     phone_number: user?.phone,
    //   },
    // };
    // const paymentObject = new window.Razorpay(options);
    // paymentObject.open();
  }

  return (
    <CommonLayout title="Cart" parent="Home">
      <section className="section-b-space">
        <Container>
         
          <Row>
            <div className="cartscreen">
              <div className="cartscreen__left">
                {cartItems.cartItems.length === 0 ? (
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
              </div>
            </div>
          </Row>
          <Row>
            <div>
              <button onClick={displayRazorpay}>Proceed To Payment</button>
            </div>
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

//export default CartScreen;
const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(CartScreen);
