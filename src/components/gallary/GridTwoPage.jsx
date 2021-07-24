import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Media, Container, Row } from "reactstrap";
import Lightbox from "react-image-lightbox";
import {
    allData,
    pizzaData,
    shakeData,
    menuData,
    shoesData,
    watchData,
  } from "../constant/portfolioData";

const allimages = [
  require("./../../assets/images/Gallery/Pizza/fullPizza.jpeg"),
    require("./../../assets/images/Gallery/Pizza/fullPizza-1.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice-1.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice-2.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice-3.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice-4.jpeg"),
    require("./../../assets/images/Gallery/Pizza/fullPizza-3.jpeg"),

    require("./../../assets/images/Gallery/Shake/shake.jpeg"),
    require("./../../assets/images/Gallery/Shake/shake1.png"),
    
    require("./../../assets/images/Gallery/Menu/1gourmet-veg.png"),
    require("./../../assets/images/Gallery/Menu/2gourmet-veg2.png"),
    require("./../../assets/images/Gallery/Menu/3gourmet-nonVeg.png"),
    require("./../../assets/images/Gallery/Menu/4chef-special-veg.png"),
    require("./../../assets/images/Gallery/Menu/5chef-special-Nonveg.png"),
];

const pizzaImages = [
   
    require("./../../assets/images/Gallery/Pizza/fullPizza.jpeg"),
    require("./../../assets/images/Gallery/Pizza/fullPizza-1.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice-1.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice-2.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice-3.jpeg"),
    require("./../../assets/images/Gallery/Pizza/pizza-slice-4.jpeg"),
    require("./../../assets/images/Gallery/Pizza/fullPizza-3.jpeg"),
];

const shakeImages = [
  require("./../../assets/images/Gallery/Shake/shake.jpeg"),
  require("./../../assets/images/Gallery/Shake/shake1.png"),
  require("./../../assets/images/Gallery/Shake/shake.jpeg"),
  require("./../../assets/images/Gallery/Shake/shake1.png"),
];
const menuImages = [
  require("./../../assets/images/Gallery/Menu/1gourmet-veg.png"),
  require("./../../assets/images/Gallery/Menu/2gourmet-veg2.png"),
  require("./../../assets/images/Gallery/Menu/3gourmet-nonVeg.png"),
  require("./../../assets/images/Gallery/Menu/4chef-special-veg.png"),
  require("./../../assets/images/Gallery/Menu/5chef-special-Nonveg.png"),
];

const GridTwoPage = ({ colClass, limit }) => {
  const l = parseInt(limit);
  const [activeTab, setActiveTab] = useState("all");
  const initilindex = { index: 0, isOpen: false };
  const [photoIndex, setPhotoIndex] = useState(initilindex);


  const MasterTabPannel = ({ img,type }) => {
    
     let allArr=allData
    if(type==='pizza')
    {
        allArr=pizzaData
    }
    else if(type==='shake')
    {
        allArr=shakeData
    }
    else if(type==='menu')
    {
        allArr=menuData
    }
    return (
      
          <>
            {allArr &&
              allArr.map((product, index) => (
                <div
                  className={`isotopeSelector filter fashion ${colClass}`}
                  key={index}
                >
                  <div className="overlay">
                    <div className="border-portfolio">
                      <a>
                        <div
                          className="overlay-background"
                          onClick={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: index,
                              isOpen: true,
                            })
                          }
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </div>
                        <Media
                          src={product.img1}
                          className="img-fluid blur-up lazyload bg-img"
                        />
                      </a>
                      {photoIndex.isOpen && (
                        <Lightbox
                          mainSrc={img[photoIndex.index].default}
                         nextSrc={img[(photoIndex.index + 1) % img.length].default}
                          prevSrc={
                            img[
                              (photoIndex.index + img.length - 1) % img.length
                            ].default
                          }
                         imageTitle={photoIndex.index + 1 + "/" + img.length}
                          onCloseRequest={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              isOpen: false,
                            })
                          }
                          onMovePrevRequest={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index:
                                (photoIndex.index + img.length - 1) %
                                img.length,
                            })
                          }
                          onMoveNextRequest={() =>
                            setPhotoIndex({
                              ...photoIndex,
                              index: (photoIndex.index + 1) % img.length,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </>
 
    );
  };

  return (
    <section className="portfolio-section grid-portfolio ratio2_3 portfolio-padding">
      <Container>
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
            <Tab
              className={`filter-button project_button ${
                activeTab == "menu" ? "active" : ""
              }`}
              onClick={() => setActiveTab("menu")}
              data-filter="menu"
            >
              Menu
            </Tab>
          </TabList>
          <Row className="row zoom-gallery">
            <TabPanel>
              <MasterTabPannel img={allimages} type={'all'} />
            </TabPanel>
            <TabPanel>
              <MasterTabPannel img={pizzaImages} type={'pizza'}/>
            </TabPanel>
            <TabPanel>
              <MasterTabPannel img={shakeImages} type={'shake'}/>
            </TabPanel>
            <TabPanel>
              <MasterTabPannel img={menuImages} type={'menu'}/>
            </TabPanel>
          </Row>
        </Tabs>
      </Container>
    </section>
  );
};

export default GridTwoPage;
