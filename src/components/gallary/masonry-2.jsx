import React, { useState } from "react";
import { Container, Media } from "reactstrap";
import Masonry from "react-masonry-css";
import {
  allData,
  pizzaData,
  shakeData,
  bagsData,
  shoesData,
  watchData,
} from "../constant/portfolioData";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
//import * as test from "../../assets/images/portfolio/";
const MasterTabPannel = ({ data, grid, colClass }) => {
  return (
    <>
      {" "}
      <Masonry
        breakpointCols={grid}
        className="isotopeContainer row"
        columnClassName={`isotopeSelector ${colClass}`}
      >
        {data.length > 0
          ? data.map((item, index) => (
              <div className="overlay" key={index}>
                <div className="border-portfolio">
                  <div>
                    <Media
                      src={item.img}
                      className="img-fluid blur-up lazyload"
                    />
                  </div>
                </div>
              </div>
            ))
          : "!! No Blogs Found"}
      </Masonry>
    </>
  );
};

const MasonryTwoPage = ({ colClass, grid, fluid }) => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <>
      <section className="portfolio-section grid-portfolio ratio2_3 portfolio-padding">
        <Container fluid={fluid}>
          <Tabs>
            <TabList align="center" id="form1">
              <Tab
                className={`filter-button project_button ${
                  activeTab == "all" ? "active" : ""
                }`}
                onClick={() => setActiveTab("all")}
                data-filter="all"
              >
                All
              </Tab>
              <Tab
                className={`filter-button project_button ${
                  activeTab == "pizza" ? "active" : ""
                }`}
                onClick={() => setActiveTab("pizza")}
                data-filter="pizza"
              >
                Pizza
              </Tab>
              <Tab
                className={`filter-button project_button ${
                  activeTab == "shake" ? "active" : ""
                }`}
                onClick={() => setActiveTab("shake")}
                data-filter="shake"
              >
                Shake
              </Tab>
             
            </TabList>
            <Container fluid={fluid}>
              <TabPanel>
                <MasterTabPannel
                  data={allData}
                  grid={grid}
                  colClass={colClass}
                />
              </TabPanel>
              <TabPanel>
                <MasterTabPannel
                  data={pizzaData}
                  grid={grid}
                  colClass={colClass}
                />
              </TabPanel>
              <TabPanel>
                <MasterTabPannel
                  data={shakeData}
                  grid={grid}
                  colClass={colClass}
                />
              </TabPanel>
              
            </Container>
          </Tabs>
        </Container>
      </section>
    </>
  );
};

export default MasonryTwoPage;
