import { useState, useEffect } from 'react'
import ThemeSettings from "./components/customizer/theme-settings";
import "./assets/scss/app.scss";
import { Navigation } from './components/navigation'
import { Gallery } from './components/gallery'
import { Menus } from './components/menus'
import { Home } from './components/home'
import { Provider } from 'react-redux';

import {BrowserRouter as Router,Switch,Route,useLocation} from 'react-router-dom';

import MasterFooterTwo from './components/footers/common/MasterFooterTwo';
import Contact from './components/contact-us/contact';
import Error from './components/error/error';
import PageNotFound from './components/error/pageNotFound';
import RegisterModal from './components/auth/RegisterModal';
import LoginModal from './components/auth/LoginModal';
import Authenticate from './components/auth/authenticate';
import store from './store';

const App = () => {
  
  const [landingPageData, setLandingPageData] = useState({})
  const [error, setError] = useState();
  

 
  return (

  <Router>
    {error ? (
        <PageNotFound/>
      ) : null}
    <div>
      <header>      
        <Navigation />
       </header>
       <Provider store={store}>

        <Switch>
        
          <Route path="/" exact  component={Home}/>
          <Route path="/gallery" component={Gallery}/>
          <Route path="/menus" component={Menus}/>
          <Route path="/contact" component={Contact}/>
     
          
           
        
        <Route path="/login" component={LoginModal}   />   
                   <Route path="/register" component={RegisterModal}   />   
                   <Route path="/authenticate" component={Authenticate}   />   

         <Route  component={Error}/>
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
          />
    </div>
      </Router>
  )
}

export default App
