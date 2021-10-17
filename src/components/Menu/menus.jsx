import React from "react";
import { Row, Container } from "reactstrap";
import CommonLayout from "../Layout/CommonLayout";
import ProductList from "./producttlist";

export const Menus = (props) => {
  return (
    <CommonLayout title="Menus" parent="Home">
      <section className="section-b-space">
        <Container>
          <Row>
            <ProductList
              colClass="col-12"
              layoutList="list-view"
              noSidebar={true}
            />
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};
