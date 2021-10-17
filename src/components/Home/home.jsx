import AboutUs from "./about-us";
import BannerSection from "./banner-section";
import Sections from "./section";
import Banner from "./SliderComponents/banner";

export const Home = (props) => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <BannerSection />
      <Sections />
    </div>
  );
};
