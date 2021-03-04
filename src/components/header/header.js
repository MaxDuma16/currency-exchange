import React from 'react';
import './header.scss';
import Navbar from '../navbar/navbar';

export const Header = () => {
    return (
        <div className = 'header'> 
            <div className = 'headerWrap'>

                <div className='logo'>
                    <a href="/">
                        <h2>Currency Exchange</h2>
                    </a>
                </div>
                <Navbar />
                <div className='person'>
                    <i className="fa fa-user" area-hidden = "true"></i>
                </div>

            </div>
            <hr/>
        </div>
    )
}