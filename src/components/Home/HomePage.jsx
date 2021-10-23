import React from 'react';
import './HomePage.css'
import HomePagePizzaImg from '../../assets/images/HomePage/home-pizza.jpg';
import {Link} from 'react-router-dom';

const HomePage = () => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-1"></div>
                <div className="col-lg-6">
                    <h5 className="order-quote">Easy way to order your food.</h5>
                    <h1 className="brand-name">Dr. Pizzeria</h1>
                    <h3 className="food-quote">Order Tasty & Fresh Food <b className="red-word">anytime!</b></h3>
                    <div className="button-div">
                        <button className="btn btn-danger">Order Now</button>
                        <Link className="menu-link" to={{pathname: `/menus`}}>See Menu</Link>
                    </div>
                </div>
                <div className="col-lg-2"></div>
                <div className="col-lg-4">
                    <img className="home-page-pizza-img" src={HomePagePizzaImg} alt="Home Page Pizza Image." />
                </div>            
            </div>
            
        </div>
    );  
};

export default HomePage;