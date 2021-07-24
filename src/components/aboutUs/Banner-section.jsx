import React, { Fragment } from "react";
import { Container, Row, Col, Media } from "reactstrap";
import banner4 from "../../assets/images/marijuana/banner/4.jpg";
import banner2 from "../../assets/images/marijuana/banner/4.jpg";
import bannerAboutUs1 from "../../assets/images/About-Us/bannerAboutUs1.jpg";
import bannerAboutUs2 from "../../assets/images/About-Us/bannerAboutUs2.jpg";

const Data = [
  {
    img: bannerAboutUs1,
    title: "",
    desc: "",
    link: "",
    classes: "p-left text-center",
  },
  {
    img: bannerAboutUs2,
    title: "",
    desc: "",
    link: "",
    classes: "p-right text-center",
  },
];

const MasterBanner = ({ img, title, desc, link, classes }) => {
  return (
    <Col md="6">
      <a>
        <div className={`collection-banner ${classes}`}>
          <div className="img-part">
            <Media
              src={img}
              className="img-fluid blur-up lazyload bg-img"
              alt=""
            />
          </div>
          <div className="contain-banner">
            <div>
              <h4>{title}</h4>
              <h2>{desc}</h2>
            </div>
          </div>
        </div>
      </a>
    </Col>
  );
};

const BannerSection = () => (
  <Fragment>
    <section className="p-t-0 section-b-space ratio_45">
      <Container>
        <Row className="partition2">
          {Data.map((data, i) => {
            return (
              <MasterBanner
                key={i}
                img={data.img}
                link={data.link}
                title={data.title}
                desc={data.desc}
                classes={data.classes}
              />
            );
          })}
        </Row>
      </Container>
    </section>
  </Fragment>
);
export default BannerSection;
