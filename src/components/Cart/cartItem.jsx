import "./CartItem.css";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  console.group('item', item)
  return (
    <div className="  ">
      <div className="item-image">
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <Link to={`/menu/${item.product}`} style={{ textDecoration: 'none' }} >
        <p className="item-name">{item.name}</p>
      </Link>
      <p className="item-price">${item.price}</p>
      <select
        value={item.qty}
        onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        className="select-style"
      >
        {[...Array(item.stockQuantity).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="item-delete"
        onClick={() => removeHandler(item.product)}
      >
        Remove
        {/* <i className="fas fa-trash"></i> */}
      </button>
    </div>
  );
};

export default CartItem;
