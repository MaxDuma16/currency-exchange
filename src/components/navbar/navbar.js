import React from 'react';
import './navbar.scss';
import { NavLink } from 'react-router-dom';

 const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to = '/' exact>Home</NavLink></li>
                <li><NavLink to ='/calc'>Calculator</NavLink></li> 
                <li><NavLink to ='/sample'>Sample</NavLink></li> 
                <li><NavLink to ='/info'>Information</NavLink></li> 
            </ul>
        </nav>
    )
}

export default Navbar;