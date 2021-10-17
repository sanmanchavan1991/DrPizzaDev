import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import CommonLayout from '../layout/CommonLayout';

const PageNotFound = () => {
    return (
        <CommonLayout parent="home" title="404">
            <section className="p-0">
                <Container>
                    <Row>
                        <Col sm="12">
                            <div className="error-section">
                               <h2>Oops! Something went wrong!</h2>
                                <a href="/" className="btn btn-solid">back to home</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </CommonLayout>
    )
}
export default PageNotFound;
