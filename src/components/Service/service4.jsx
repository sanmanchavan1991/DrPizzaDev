import React from "react";
import { Container, Row, Col } from "reactstrap";
import MasterServiceContent from "./MasterServiceContent";
// import {
//   svgFastEfficient,
//   svgFreeShipping,
//   svgpayment,
//   svgservice,
// } from "../../../services/script";

const Data = [
  {
    link: '',
    title: "free shipping",
    service: "on orders over $50",
  },
  {
    link: '',
    title: "online payment",
    service: "instantly pay online",
  },
  {
    link: '',
    title: "24 X 7 service",
    service: "Our service is available 24/7",
  },
  {
    link: '',
    title: "fast & efficient",
    service: "fast and qualitative product",
  },
];

const Service = () => {
  return (
    <Container>
      <section className="service small-section pb-0">
        <Row className="partition4">
          {Data.map((data, index) => {
            return (
              <Col
                lg="2"
                xs="6"
                className={`${index === 0 ? "offset-lg-2" : ""} service-block1`}
                key={index}
              >
                
              </Col>
            );
          })}
        </Row>
      </section>
    </Container>
  );
};
export default Service;