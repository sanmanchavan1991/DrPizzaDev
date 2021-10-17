import React, { Fragment } from "react";
import Slider from "react-slick";
import MasterBanner from "./masterBanner";

const Banner = (props) => {
  const sliderData = [
    {
      classes: "text-center bg-size blur-up lazyloaded",
      desc: "all jewellery",
      img: "home57",
      link: "#",
      title: "summer salean exemplart gateway to happiness",
    },
    {
      classes: "text-center bg-position p-right",
      desc: "flat 20% off",
      img: "home58",
      link: "#",
      title: "an exemplart gateway to happiness",
    },
    {
      classes: "text-center bg-position p-right",
      desc: "flat 20% off",
      img: "home59",
      link: "#",
      title: "an exemplart gateway to happiness",
    },
  ];

  return (
    <Fragment>
      <section className="p-0 height-100">
        <div className="home-slider">
          <Slider>
            {sliderData.map((data, i) => {
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
          </Slider>
        </div>
      </section>
    </Fragment>
  );
};

export default Banner;
