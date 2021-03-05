import React, { Fragment } from 'react';
import './layout.scss';
import  Home  from '../../pages/home/home';
import { Route, Switch } from 'react-router-dom';
import AddClass from '../../hoc/AddClass';
import  { Header }  from '../header/header';
import  Sidebar  from '../sidebar/sidebar';

import Calc  from '../../pages/calc/calc';
import Info  from '../../pages/info/info';
import Sample  from '../../pages/sample/sample';

 const Layout = () => {

    return (
        <Fragment>
            <Header />
            <div className = "content">
                <div className= "routes">
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/calc' render= {()=> <Calc/>}/>
                        <Route path='/sample' render= {() => <Sample />}/>
                        <Route path='/info' render= {() => <Info />}/>
                    </Switch>
                </div>
                <Sidebar />
            </div>
        </Fragment>
    )
}

export default AddClass(Layout, 'layout');