import React from 'react';
import './navbar.scss';

 const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href = '/'>Home</a></li>
                <li><a href='/calc'>Calculator</a></li> 
                <li><a href='/points'>Points</a></li> 
                <li><a href='/info'>Information</a></li> 
            </ul>
        </nav>
    )
}

export default Navbar;