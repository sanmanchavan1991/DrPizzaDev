import React from "react";
import { Row, Container } from "reactstrap";
import CommonLayout from "../Layout/commonLayout";
import ProductList from "./producttlist";

export const Menus = (props) => {
  return (

    <Container>
      <Row>
        <ProductList
          colClass="col-12"
          layoutList="list-view"
          noSidebar={true}
        />
      </Row>
    </Container>
  );
};
