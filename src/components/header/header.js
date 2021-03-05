import React, {useContext} from 'react';
import './header.scss';
import Navbar from '../navbar/navbar';
import { RateContext } from '../../context/ReteContext';

export const Header = () => {
    const { modalShowHandler } = useContext(RateContext);
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
                    <i className="fa fa-user" area-hidden = "true" onClick={ modalShowHandler }></i>
                </div>

            </div>
            <hr/>
        </div>
    )
}