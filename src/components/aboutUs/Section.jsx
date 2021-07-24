import React from "react";
import { Container, Row, Col } from "reactstrap";

const MasterSection = ({ img, title, desc }) => {
  return (
    <Col md="4">
      <div className="detail_section">
        <div>
          <div dangerouslySetInnerHTML={{ __html: img }}></div>
          <h4>{title}</h4>
          <p>{desc}</p>
        </div>
      </div>
    </Col>
  );
};

const Sections = (props) => {

  return(
  <section className="section-b-space detail-cannabis bg-grey">
    <Container>
      <Row>
        {props.SectionData.map((data, i) => {
          return (
            <MasterSection
              key={i}
              img={data.img}
              title={data.title}
              desc={data.desc}
            />
          );
        })}
      </Row>
    </Container>
  </section>
  )
};

export default Sections;
