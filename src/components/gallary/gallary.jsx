import React from 'react';
import { Row, Container } from 'reactstrap';
import CommonLayout from '../layout/CommonLayout';
import GridTwoPage from './GridTwoPage';


const Gallary = () => {
    return (
        <CommonLayout title="Gallery" parent="Home" >
             <section className="section-b-space">
            <Container>
                <Row>
                     <GridTwoPage colClass="col-lg-3 col-sm-6" limit='12'/>
                </Row>
            </Container>
            </section>
        </CommonLayout>
    )
}

export default Gallary;