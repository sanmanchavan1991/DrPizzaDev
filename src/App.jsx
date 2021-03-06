import { useState, useEffect } from "react";
import ThemeSettings from "./components/WebSiteTheme/theme-settings";
import "./assets/scss/app.scss";
import { Navigation } from "./components/Navigation/navigation";
import { Menus } from "./components/Menu/menus";
import { Home } from "./components/Home/home";
import { Provider } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import MasterFooterTwo from "./components/footers/common/MasterFooterTwo";
import Contact from "./components/Contact-Us/contact";
import Error from "./components/Error/error";
import PageNotFound from "./components/Error/pageNotFound";
import RegisterModal from "./components/Auth/RegisterModal";
import LoginModal from "./components/Auth/LoginModal";
import resetPassword from "./components/Auth/resetPassword";

import ProductScreen from "./components/Menu/ProductScreen";
import CartScreen from "./components/Cart/CartScreen";
import AdminCheck from "./components/Admin/AdminCheck";
import ForgotPassModal from "./components/Auth/forgotPassword";

import store from "./store";

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [error, setError] = useState();

  return (
    <Router>
      {error ? <PageNotFound /> : null}
      <div>
        <Provider store={store}>
          <header>
            <Navigation />
          </header>

          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/menus" component={Menus} />
            <Route path="/contact" component={Contact} />

            <Route path="/login" component={LoginModal} />
            <Route path="/register" component={RegisterModal} />
            <Route path="/authenticate" component={ForgotPassModal} />
            <Route path="/admin" component={AdminCheck} />

            {/* Pages not listed on Menu */}
            <Route path="/forgotPassword" component={ForgotPassModal} />
            <Route path="/resetPassword/:token" component={resetPassword} />
            <Route path="/menu/:id" component={ProductScreen} />
            <Route path="/cart" component={CartScreen} />

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
        />
      </div>
    </Router>
  );
};

export default App;
