import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Collapse } from "reactstrap";
import CopyRight from "./copyright";
import LogoImage from "../../header/logo";

const MasterFooterTwo = ({
  layoutClass,
  logoName,
  footerClass,
  footerSection,
  logoImg,
  footerLogoClass,
  btnGreen,
  myAccount,
  leftFooter,
  rightFooter
}) => {
  const [isOpen, setIsOpen] = useState();
  const [collapse, setCollapse] = useState(0);
  const width = window.innerWidth < 750;
  useEffect(() => {
    const changeCollapse = () => {
      if (window.innerWidth < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener('resize', changeCollapse)
    }
  }, []);
  return (
    <Fragment>
      <footer className={footerClass}>
        <div className="dark-layout">
          <Container>
            <section className={`section-b-space ${footerSection}`}>
              <Row className="footer-theme2">
                <Col lg="3">
                  <div
                    className={`footer-title 	${
                      isOpen && collapse == 1 ? "active" : ""
                    }  footer-mobile-title`}
                  >
                    <h4
                      onClick={() => {
                        setCollapse(1);
                        setIsOpen(!isOpen);
                      }}
                    >
                      about
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 1 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <div className={`footer-logo ${footerLogoClass}`}>
                        {true ? (
                          <LogoImage logo={'drPizza-icon-72x72.png'} />
                        ) : (
                          <img src={''} alt="" />
                        )}
                      </div>
                      <p>
                      {leftFooter && leftFooter.heading1}
                      </p>
                      <p>
                      {leftFooter && leftFooter.heading2}
                      </p>
                      <p>
                      {leftFooter && leftFooter.heading3}
                      </p>
                    </div>
                  </Collapse>
                </Col>
                <Col lg="5" className="subscribe-wrapper">
                  
                </Col>
                <Col lg="4">
                  <div
                    className={`footer-title 	${
                      isOpen && collapse == 2 ? "active" : ""
                    } `}
                  >
                    <h4
                      onClick={() => {
                        setCollapse(2);
                        setIsOpen(!isOpen);
                      }}
                    >
                      store information
                      <span className="according-menu"></span>
                    </h4>
                  </div>
                  <Collapse
                    isOpen={width ? (collapse === 2 ? isOpen : false) : true}
                  >
                    <div className="footer-contant">
                      <ul className="contact-details">
                        <li> {rightFooter && rightFooter.heading1}</li>
                        <li>Call Us: {rightFooter && rightFooter.phoneNo}</li>
                        <li>
                          Email Us: <a href={null}>{rightFooter && rightFooter.emailId}</a>
                        </li>
                        <li>Timing: {rightFooter && rightFooter.timing}</li>
                        <li>Delivery: {rightFooter && rightFooter.delivery}</li>

                      </ul>
                    </div>
                  </Collapse>
                </Col>
              </Row>
            </section>
          </Container>
        </div>
        {myAccount ? (
          <div className="dark-layout">
            <Container>
              <section className="small-section">
                <Row className="footer-theme2">
                  <Col className="p-set">
                    <div className="footer-link">
                      <div
                        className={`footer-title ${
                          isOpen && collapse == 3 ? "active" : ""
                        } `}
                      >
                        <h4
                          onClick={() => {
                            setCollapse(3);
                            setIsOpen(!isOpen);
                          }}
                        >
                          my account
                          <span className="according-menu"></span>
                        </h4>
                      </div>
                      <Collapse
                        isOpen={
                          width ? (collapse === 3 ? isOpen : false) : true
                        }
                      >
                        <div className="footer-contant">
                          <ul>
                            <li>
                              <a href={null}>mens</a>
                            </li>
                            <li>
                              <a href={null}>womens</a>
                            </li>
                            <li>
                              <a href={null}>clothing</a>
                            </li>
                            <li>
                              <a href={null}>accessories</a>
                            </li>
                            <li>
                              <a href={null}>featured</a>
                            </li>
                          </ul>
                        </div>
                      </Collapse>
                    </div>
                    <div className="footer-link-b">
                      <div
                        className={`footer-title ${
                          isOpen && collapse == 4 ? "active" : ""
                        } `}
                      >
                        <h4
                          onClick={() => {
                            setCollapse(4);
                            setIsOpen(!isOpen);
                          }}
                        >
                          why we choose
                          <span className="according-menu"></span>
                        </h4>
                      </div>
                      <Collapse
                        isOpen={
                          width ? (collapse === 4 ? isOpen : false) : true
                        }
                      >
                        <div className="footer-contant">
                          <ul>
                            <li>
                              <a href={"#"}>shipping & return</a>
                            </li>
                            <li>
                              <a href={"#"}>secure shopping</a>
                            </li>
                            <li>
                              <a href={"#"}>gallary</a>
                            </li>
                            <li>
                              <a href={"#"}>affiliates</a>
                            </li>
                            <li>
                              <a href={"#"}>contacts</a>
                            </li>
                          </ul>
                        </div>
                      </Collapse>
                    </div>
                  </Col>
                </Row>
              </section>
            </Container>
          </div>
        ) : (
          ""
        )}

        <CopyRight layout={layoutClass ? layoutClass : ""} />
      </footer>
    </Fragment>
  );
};

export default MasterFooterTwo;
