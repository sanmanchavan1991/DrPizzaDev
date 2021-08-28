import AboutUs from "./aboutUs/About-us";
import BannerSection from "./aboutUs/Banner-section";
import Sections from "./aboutUs/Section";
import Banner from "./SliderComponents/Banner";

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
