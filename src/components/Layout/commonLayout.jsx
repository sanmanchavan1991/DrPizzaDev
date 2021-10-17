import React from "react";
import Breadcrubs from "../breadcrubs/breadcrubs";

const CommonLayout = ({ children, title, parent, subTitle }) => {
  return (
    <>

      <Breadcrubs title={title} parent={parent} subTitle={subTitle} />
      <>{children}</>

    </>
  );
};

export default CommonLayout;
