import React, { useState, useEffect } from "react";
//import Link from "next/link";
import { Link } from "react-router-dom";
import './navbar.css';
import { MENUITEMS } from "../MenuBar/menuList";
import { Container, Row } from "reactstrap";
import { useRouter } from "next/router";
import { connect } from 'react-redux';

const NavBar = (cartItems) => {
  const [navClose, setNavClose] = useState({ right: "-410px" });
  const router = useRouter();
  console.log('Hello WOrld==>',cartItems.cartItems)   
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
    <div className="main-theme" style={{backgroundColor: '#1D1C1C'}}>
      <div className="main-navbar theme">
        <div id="mainnav">
          <div className="toggle-nav" onClick={openNav.bind(this)}>
            <i className="fa fa-bars sidebar-bar"></i>
          </div>
          <ul className="nav-menu" style={navClose}>
            <li className="back-btn" onClick={closeNav.bind(this)}>
              <div className="mobile-back text-right">
                <span>Back navbar</span>
                <i className="fa fa-angle-right pl-2" aria-hidden="true"></i>
              </div>
            </li>
            {MENUITEMS.map((menuItem, i) => {
              return (
                <li
                  key={i}
                  className={` ${menuItem.megaMenu ? "mega-menu" : ""}`}
                  onClick={closeNav.bind(this)}
                >
                  <Link className="nav-link" to={menuItem.path}>
                    {" "}
                    {menuItem.title}
                  </Link>
                </li>
              );
            })}

            <li>
              <Link to="/cart" className="cart__link">
                <i className="fa fa-shopping-cart"></i>
                <span>
                  Cart <span className="cartlogo__badge">{getCartCount()}</span>
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

export default connect(mapStateToProps, {  })(NavBar);
