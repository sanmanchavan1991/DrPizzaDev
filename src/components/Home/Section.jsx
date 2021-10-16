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
  const sectionData = [
    {
      desc: "Our pizza is hand-stretched by an age-old technique used by pizzaiolo in Naples",
      img: "",
      title: "Neapolitan pizza",
    },
    {
      desc: "We use 24 hrs fermented dough which is made with 00 flour for perfect taste and crisp",
      img: "",
      title: "24 hrs fermented dough",
    },
    {
      desc: "text-center bg-size blur-up lazyloaded ",
      img: "home57",
      title: "Fresh Organic Topping",
    },
  ];

  return (
    <section className="section-b-space detail-cannabis bg-grey">
      <Container>
        <Row>
          {sectionData.map((data, i) => {
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
  );
};

export default Sections;
