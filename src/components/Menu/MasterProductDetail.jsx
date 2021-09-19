import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  uniqueTags,
  detailClass,
  title,
  des,
  variantChangeByColor,
}) => {
  const [qty, setQty] = useState(1);


  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>

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
    </div>
  );
};

export default MasterProductDetail;
