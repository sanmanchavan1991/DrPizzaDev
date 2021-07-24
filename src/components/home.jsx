import AboutUs from "./aboutUs/About-us"
import BannerSection from "./aboutUs/Banner-section"
import Sections from "./aboutUs/Section"
import Banner from "./SliderComponents/Banner"

export const Home = (props) => {

  return (
     <div>
      { <Banner Data={props.data}/>}
      {<AboutUs AboutUsData={props.aboutUsData}/>}
      { <BannerSection />}
      <Sections SectionData={props.sectionData}/>
    </div>
  )
}
