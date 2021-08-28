import React from "react";

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
  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }

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


      </div>
    </div>
  );
};

export default MasterProductDetail;
