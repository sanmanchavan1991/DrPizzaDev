
import React, { Fragment, useContext } from "react";
import { Media, Container, Row, Col, Input, Form, Button } from "reactstrap";
import LogoImage from "../Header/logo";
import NavBar from "../Header/navbar";

export const Navigation = (props) => {
  return (
    
    <Container>
          <Row>
            <Col>
              <div className="main-menu">
                <div className="menu-left">
               
                  <div className="brand-logo">
                    <LogoImage logo={'drPizza-icon-120x120.png'} />
                  </div>
                </div>
                <div className="menu-right pull-right">
                  <NavBar />

                  <div>
                    <div className="icon-nav">
                      <ul>
                        <li className="onhover-div mobile-search">
                          <div>
                            <Media
                             
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </li>
                       
                       
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
  )
}
