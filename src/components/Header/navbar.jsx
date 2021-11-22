import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { MENUITEMS } from "../MenuBar/menuList";
import { useRouter } from "next/router";
import { connect } from 'react-redux';
import LogoImage from "../Header/logo";

const NavBar = (cartItems) => {
  const [navClose, setNavClose] = useState({ right: "-410px" });
  const router = useRouter();
  console.log('Hello WOrld==>', cartItems.cartItems)
  const getCartCount = () => {
    return cartItems.cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    //return 0;
  };
  useEffect(() => {
    if (window.innerWidth < 750) {
      setNavClose({ right: "-410px" });
    }
    if (window.innerWidth < 1199) {
      setNavClose({ right: "-300px" });
    }
  }, []);

  const openNav = () => {
    setNavClose({ right: "0px" });
  };

  const closeNav = () => {
    setNavClose({ right: "-410px" });
  };

  const [mainmenu, setMainMenu] = useState(MENUITEMS);

  useEffect(() => {
    const currentUrl = location.pathname;
    MENUITEMS.filter((items) => {
      if (items.path === currentUrl) setNavActive(items);
      if (!items.children) return false;
      items.children.filter((subItems) => {
        if (subItems.path === currentUrl) setNavActive(subItems);
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems) => {
          if (subSubItems.path === currentUrl) setNavActive(subSubItems);
        });
      });
    });
  }, []);

  const setNavActive = (item) => {
    MENUITEMS.filter((menuItem) => {
      if (menuItem != item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = false;
          }
        });
      }
    });

    setMainMenu({ mainmenu: MENUITEMS });
  };

  return (
    <div className="container">
      <div className="row">
        <div id="col">
          {/* <div className="toggle-nav" onClick={openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar"></i>
          </div> */}
          <ul className="nav justify-content-center nav-list" style={navClose}>
            {/* <li className=" nav-item back-btn" onClick={closeNav.bind(this)}>
              <div className="mobile-back text-right">
                <span>Back navbar</span>
                <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
              </div>
            </li> */}
            <li className="logo-img-list">
              <LogoImage logo={'drPizza-icon-120x120.png'} />
            </li>
            {MENUITEMS.map((menuItem, i) => {
              return (
                <li
                  key={i}
                  className={` ${menuItem.megaMenu ? "mega-menu" : ""}`}
                  onClick={closeNav.bind(this)}
                  style={{ marginLeft: "50px" }}
                >
                  {menuItem.path === "/register" ? <Link className="nav-link btn link-style signup" style={{ backgroundColor: "#41C485" }} to={menuItem.path}>
                    {" "}
                    {menuItem.title}
                  </Link> : <Link className="nav-link link-style nav-item" to={menuItem.path}>
                    {" "}
                    {menuItem.title}
                  </Link>}

                </li>
              );
            })}

            <li>
              <Link to="/cart" className="btn btn-light cart__link" style={{ marginLeft: "20px", color: '#fff' }}>
                <i className="fa fa-shopping-cart"></i>
                <span>
                  <span className="cartlogo__badge">  {getCartCount()}</span>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems
});

export default connect(mapStateToProps, {})(NavBar);
