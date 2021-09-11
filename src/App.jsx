import { useState, useEffect } from "react";
import ThemeSettings from "./components/customizer/theme-settings";
import "./assets/scss/app.scss";
import { Navigation } from "./components/navigation";
import { Gallery } from "./components/gallery";
import { Menus } from "./components/menus";
import { Home } from "./components/home";
import { Provider } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import *  as FirestoreService  from './firebaseService/Firestore';
import MasterFooterTwo from './components/footers/common/MasterFooterTwo';
import Contact from './components/contact-us/contact';
import Error from './components/error/error';
import PageNotFound from './components/error/pageNotFound';
import RegisterModal from './components/auth/RegisterModal';
import LoginModal from './components/auth/LoginModal';
import Authenticate from './components/auth/authenticate';
import store from './store';
import AdminCheck from './components/admin/AdminCheck';

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [error, setError] = useState();

  return (
    <Router>
      {error ? <PageNotFound /> : null}
      <div>
        <header>
          <Navigation />
        </header>
        <Provider store={store}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/menus" component={Menus} />
            <Route path="/contact" component={Contact} />

            <Route path="/login" component={LoginModal} />
            <Route path="/register" component={RegisterModal} />
            <Route path="/authenticate" component={ForgotPassModal} />
          </Switch>
        <Switch>
          <Route path="/" exact render={(props) => landingPageData && landingPageData.about?(<Home  
          data={landingPageData.about.slider} 
          aboutUsData={landingPageData.about} 
          sectionData={landingPageData.about.sections}
          />):null}/>
          <Route path="/gallery" component={Gallery}/>
          <Route path="/menus" component={Menus}/>
         <Route path="/contact" render={(props) => landingPageData && landingPageData.contactUs?(<Contact  
          contactUsInformation={landingPageData.contactUs.ContactUsInformation}
          emailJsInformation={landingPageData.contactUs.emailJsInformation}  />):null} 
          
          
          /> 
        
        <Route path="/login" component={LoginModal}   />   
                   <Route path="/register" component={RegisterModal}   />   
                   <Route path="/authenticate" component={Authenticate}   /> 
                   <Route path="/admin" component={AdminCheck}   />  

            {/* Pages not listed on Menu */}
            <Route path="/forgotPassword" component={ForgotPassModal} />
            <Route path="/resetPassword/:token" component={resetPassword} />


            <Route component={Error} />
          </Switch>
        </Provider>
        <ThemeSettings />
        <MasterFooterTwo
          footerClass={`footer-light footer-christmas bg-size`}
          footerLayOut={"light-layout upper-footer"}
          footerSection={"small-section border-section border-top-0"}
          belowSection={"section-b-space light-layout"}
          newLatter={false}
          logoName={"logo/f5.png"}
          leftFooter={landingPageData && landingPageData.footer ? landingPageData.footer.leftFooter:null}
          rightFooter={landingPageData && landingPageData.footer ?landingPageData.footer.rightFooter:null} 
          
          />
    </div>
      </Router>
  )
}

export default App;
