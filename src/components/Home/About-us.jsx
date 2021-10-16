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
                            <h2 className="title-inner3">Welcome to Dr. Pizzeria</h2>
                            <div className="line"></div>
                        </div>
                        <div className="about-text">
                            <p>
                            We are a young team with an enormous love for Pizza. The founder of Dr. Pizzeria, Dr. Maaz Ahmed Ansari is a dentist by profession and an avid pizza lover.   </p>
                            <p>
                            We enjoy sharing the food that we cooked with close ones and more than cooking /baking them, It just warms our heart when our food brings a smile to people's faces. We have always been fascinated by Italian and Middle Eastern cuisine. If you love Italian cuisine you would love pizza, by default. As it was perfected by the great pizzaiolo of Italy. </p>
                            <p>
                            Finding good Italian pizza in Mumbai was really hard and expensive so we started learning the techniques to make a Neapolitan from great pizzaioli like vito lacopeli. It took us several months and a lot of experimenting to perfect our technique and learn all the secrete about making a perfect Neapolitan piazza as near as Neapolitan pizza in Italy. And then we thought, let's share with other Mumbaikars! and that's how Dr.Pizzeria was born.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </Fragment>)
}

export default AboutUs;