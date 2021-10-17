import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const LogoImage = ({ logo }) => {
    return (
        <Fragment>
            <Link to={'/'} >
                <a>
                    { <img src={`/img/logo/${logo?logo:'logo.png'}`} alt="" className="img-fluid" /> }
                 
                </a>
            </Link>
        </Fragment>
    )
}

export default LogoImage;
