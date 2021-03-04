import React, {Fragment} from 'react';
import './layout.scss';
import AddClass from '../../hoc/AddClass';
import { Header } from '../header/header';
import Home from '../../pages/home/home';
import Sidebar from '../sidebar/sidebar';

 const Layout = () => {

    return (
        <Fragment>
            <Header />
            <div className = "content">
                <div className= "routes">
                    <Home />
                </div>
                <Sidebar />
            </div>
        </Fragment>
    )
}

export default AddClass(Layout, 'layout') ;