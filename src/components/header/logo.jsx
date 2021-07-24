import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//drPizzaFavicon-180x180
//href="img/logo/drPizzaFavicon-16x16.png" 
const LogoImage = ({ logo }) => {
    return (
        <Fragment>
            <Link to={'/'} >
                <a>
                    { <img src={`/img/logo/${logo?logo:'logo.png'}`} alt="" className="img-fluid" /> }
                   {/* <span className="logoText">Dr Pizzeria</span> */}
                </a>
            </Link>
        </Fragment>
    )
}

export default LogoImage;