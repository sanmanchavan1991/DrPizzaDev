import React, { Fragment } from 'react';
import { Container, Row ,Col } from 'reactstrap';

const AboutUs = (props) => {

   
    return (
    <Fragment>
        <section>
            <Container>
                <Row>
                    <Col lg="8" className="offset-lg-2">
                        <div className="title3">
                            <h4>About Us</h4>
                            <h2 className="title-inner3">{props.AboutUsData.title}</h2>
                            <div className="line"></div>
                        </div>
                        <div className="about-text">
                            <p>
                            {props.AboutUsData.paragraph }   </p>
                            <p>
                            {props.AboutUsData.paragraph1} </p>
                            <p>
                            {props.AboutUsData.paragraph2 }
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </Fragment>)
}

export default AboutUs;