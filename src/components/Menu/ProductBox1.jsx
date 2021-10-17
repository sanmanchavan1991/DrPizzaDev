import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Row, Col, Media, Modal, ModalBody } from "reactstrap";
import MasterProductDetail from "./masterProductDetail";


const ProductItem = ({
  product,
  addCart,
  backImage,
  des,
  addWishlist,
  cartClass,
  productDetail,
  addCompare,
  title,
  symbol
}) => {
  const router = useRouter();


  const [image, setImage] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCompare, setModalCompare] = useState(false);
  const toggleCompare = () => setModalCompare(!modalCompare);
  const toggle = () => setModal(!modal);
  const uniqueTags = [];

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
    <div className="product-box product-wrap">
      <div className="img-wrapper">
        <div className="lable-block">
         
        </div>
        <div className="front" //onClick={clickProductDetail}
        >
          <Media
            src={`${image ? image : product.foodImage}`}
            className="img-fluid"
            alt=""
          />
        </div>
        {backImage ? (
          product.images[1] === "undefined" ? (
            "false"
          ) : (
            <div className="back" //onClick={clickProductDetail}
            >
              <Media
                src={`${image ? image : product.foodImage}`}
                className="img-fluid m-auto"
                alt=""
              />
            </div>
          )
        ) : (
          ""
        )}

        <div className={cartClass}>
          
          <Modal
            isOpen={''}
            toggle={''}
            size="lg"
            centered
          >
            <ModalBody>
              <Row className="compare-modal">
                <Col lg="12">
                  <div className="media">
                    <Media
                      src={`${
                        product.variants && image
                          ? image
                          : product.foodImage
                      }`}
                      alt=""
                      className="img-fluid"
                    />
                    
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </div>
        {product.foodImage ? (
          <ul className="product-thumb-list">
              <li
                className={`grid_thumb_img ${
                   "active" 
                }`}
              >
               
              </li>
          </ul>
        ) : (
          ""
        )}
      </div>
      <MasterProductDetail
        product={product}
        productDetail={productDetail}
        currency={symbol}
        uniqueTags={uniqueTags}
        title={title}
        des={des}
        variantChangeByColor={variantChangeByColor}
      />
      
    </div>
  );
};

export default ProductItem;
