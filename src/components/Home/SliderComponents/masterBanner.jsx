import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  return (



    <div>
      {img === 'MenuTab1' ? (
        <div className={`menuTab ${img} ${classes ? classes : "text-center"}`}>
          <Container>
            <Row>
              <Col>
                <div className="">
                  <div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div className={`home ${img} ${classes ? classes : "text-center"}`}>
          <Container>
            <Row>
              <Col>
                <div className="slider-contain">
                  <div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

      )
      }
    </div>



  );
};

export default MasterBanner;
