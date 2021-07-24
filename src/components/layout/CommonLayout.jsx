import React from "react";
import Breadcrubs from "../breadcrubs/Breadcrubs";

const CommonLayout = ({ children, title, parent, subTitle }) => {
  return (
    <>

      <Breadcrubs title={title} parent={parent} subTitle={subTitle} />
      <>{children}</>

    </>
  );
};

export default CommonLayout;
