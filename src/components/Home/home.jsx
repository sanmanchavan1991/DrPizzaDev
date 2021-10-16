import AboutUs from "./About-us";
import BannerSection from "./Banner-section";
import Sections from "./Section";
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
