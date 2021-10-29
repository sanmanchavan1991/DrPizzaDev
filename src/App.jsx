import { useState, useEffect } from "react";
import ThemeSettings from "./components/WebSiteTheme/theme-settings";
import "./assets/scss/app.scss";
import { useSelector  } from "react-redux";
import WebFont from "webfontloader";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import { Home } from "./components/Home/home";
import { Navigation } from "./components/Navigation/navigation";
import MasterFooterTwo from "./components/footers/common/masterFooterTwo";
// import Contact from "./components/contact-us/contact";

//import { Menus } from "./components/Menu/menus";
// import Error from "./components/error/error";
// import PageNotFound from "./components/error/pageNotFound";
// import RegisterModal from "./components/auth/registerModal";
// import LoginModal from "./components/auth/loginModal";
// import resetPassword from "./components/auth/resetPassword";

// import ProductScreen from "./components/Menu/ProductScreen";
// import CartScreen from "./components/cart/cartScreen";
// import AdminCheck from "./components/admin/adminCheck";
// import ForgotPassModal from "./components/auth/forgotPassword";

import LoginSignUp  from "./components/user/loginSignUp";
import ForgotPassword  from "./components/user/forgotPassword";
import store from "./store";
import { PageLoadUser } from "./actions/userAction";
// const App = () => {
//   const [landingPageData, setLandingPageData] = useState({});
//   const [error, setError] = useState();

//   return (
//     <Router>
//       {error ? <PageNotFound /> : null}
//       <div>
//         <Provider store={store}>
//           <header>
//             <Navigation />
//           </header>

//           <Switch>
//             <Route path="/" exact component={Home} />
//             <Route path="/menus" component={Menus} />
//             <Route path="/contact" component={Contact} />

//             <Route path="/login" component={LoginModal} />
//             <Route path="/register" component={RegisterModal} />
//             <Route path="/authenticate" component={ForgotPassModal} />
//             <Route path="/admin" component={AdminCheck} />

//             {/* Pages not listed on Menu */}
//             <Route path="/forgotPassword" component={ForgotPassModal} />
//             <Route path="/resetPassword/:token" component={resetPassword} />
//             <Route path="/menu/:id" component={ProductScreen} />
//             <Route path="/cart" component={CartScreen} />

//             <Route component={Error} />
//           </Switch>
//         </Provider>
//         <ThemeSettings />
//         <MasterFooterTwo
//           footerClass={`footer-light footer-christmas bg-size`}
//           footerLayOut={"light-layout upper-footer"}
//           footerSection={"small-section border-section border-top-0"}
//           belowSection={"section-b-space light-layout"}
//           newLatter={false}
//           logoName={"logo/f5.png"}
//         />
//       </div>
//     </Router>
//   );
// };
const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const isPageRefreshOrPageLoad=false;
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(PageLoadUser());
  }, []);

  return (
    <Router>
      <header> <Navigation /></header>
                 <Switch>
             <Route path="/" exact component={Home} />
             
              <Route exact  path="/login" component={LoginSignUp} /> 
              <Route path="/forgotPassword" component={ForgotPassword} />
             {/* <Route path="/menus" component={Menus} />
            <Route path="/contact" component={Contact} />

             <Route path="/login" component={LoginModal} />
             <Route path="/register" component={RegisterModal} />
             <Route path="/authenticate" component={ForgotPassModal} />
             <Route path="/admin" component={AdminCheck} />

            
             <Route path="/resetPassword/:token" component={resetPassword} />
             <Route path="/menu/:id" component={ProductScreen} />
             <Route path="/cart" component={CartScreen} />

             <Route component={Error} /> */}
          </Switch>
      <ThemeSettings />
      <MasterFooterTwo
          footerClass={`footer-light footer-christmas bg-size`}
          footerLayOut={"light-layout upper-footer"}
          footerSection={"small-section border-section border-top-0"}
          belowSection={"section-b-space light-layout"}
          newLatter={false}
          logoName={"logo/f5.png"}
        />
      </Router>
  );
};

export default App;
