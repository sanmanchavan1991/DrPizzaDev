import React, { Fragment } from "react";
import { Container, Row, Col, Media } from "reactstrap";
import { Link } from "react-router-dom";

const ContactUsFooter = ({ layout, fluid }) => {
  return (
    <Fragment>
      <div className={`sub-footer ${layout}`}>
        <Container fluid={fluid}>
          <Row>
            <Col xl="6" md="6" sm="12">
              <div className="footer-end">
                <p>
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                  <Link to="/contact"> Contact Us</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

export default ContactUsFooter;
