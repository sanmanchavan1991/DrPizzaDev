import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import Menu2 from "../../../src/assets/images/mega-menu/22.jpg";
import { CurrencyContext } from "../../../src/components/Currency/CurrencyContext";
import ProductItem from "./ProductBox1";
import { getMenus} from '../../actions/MenuAction';
import { connect } from 'react-redux';


const ProductList = ({ getMenus,menus ,colClass, layoutList, openSidebar, noSidebar }) => {
  const [selectedCurr, selectedCurrency] = useState({
    currency: "INR",
    symbol: "₹",
    value: 1,
  });





  // const [menuData, setMenuData] = useState({})
  const [error, setError] = useState();
  // useEffect(() => {
  
  //   FirestoreService.getMenuData()
  //     .then(response => {
  //       const fetchedDesignData = [];
  //       response.docs.forEach(document => {
  //         setError(null);
  //         fetchedDesignData.push(document.data());
  //       });
  //       setMenuData(fetchedDesignData);
  //     })
  //     .catch(error => {
  //       setError(error);
  //       console.log('FirestoreService error==>', error)
  //     });
  // }, []);

  useEffect(() => {
    getMenus();
  }, [getMenus]);

  const curContext = useContext(CurrencyContext);
  const [grid, setGrid] = useState(colClass);
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(layoutList);
  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <div className="top-banner-wrapper">
              <a href={null}>
                <Media
                  src={Menu2}
                  className="img-fluid blur-up lazyload"
                  alt=""
                />
              </a>
              <div className="top-banner-content small-section">
                {/* <h4>fashion</h4>
                <h5>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </h5>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p> */}
              </div>
            </div>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">

                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          {/* {data
                         ? `Showing Products 1-${data.products.items.length} of ${data.products.total}`
                         : "loading"}{" "} */}
                          Result
                        </h5>
                      </div>
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                            //    onClick={() => {
                            //      setLayout("");
                            //      setGrid("col-lg-3");
                            //    }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                            //    onClick={() => {
                            //      setLayout("list-view");
                            //      setGrid("col-lg-12");
                            //    }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={
                          layout === "list-view"
                            ? { opacity: 0 }
                            : { opacity: 1 }
                        }
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/images/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              //onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/3.png`}
                              alt=""
                              className="product-3-layout-view"
                            //onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                            //onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                            // onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-per-view">
                        <select
                        //  onChange={(e) => setLimit(parseInt(e.target.value))}
                        >
                          <option value="10">10 Products Par Page</option>
                          <option value="15">15 Products Par Page</option>
                          <option value="20">20 Products Par Page</option>
                        </select>
                      </div>
                      <div className="product-page-filter">
                        <select //onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="AscOrder">Sorting items</option>
                          <option value="HighToLow">High To Low</option>
                          <option value="LowToHigh">Low To High</option>
                          <option value="Newest">Newest</option>
                          <option value="AscOrder">Asc Order</option>
                          <option value="DescOrder">Desc Order</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>

                  {menus && menus.length > 0 && menus.map((product, i) => (
                    <div className={grid} key={i}>
                      <div className="product">
                        <div>
                          {<ProductItem
                            des={true}
                            product={product}
                            symbol={selectedCurr}
                            cartClass="cart-info cart-wrap"

                          />}
                        </div>
                      </div>
                    </div>
                  ))
                  }
                </Row>
              </div>

            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

//export default ProductList;
const mapStateToProps = (state) => ({
  menus: state.menu.menus,
  isLoading: state.menu.isLoading
});

export default connect(mapStateToProps, { getMenus })(ProductList);