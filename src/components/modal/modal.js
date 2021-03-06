import React, {Fragment, useState, useContext } from 'react';
import { RateContext } from '../../context/ReteContext';
import Login from '../login/login';
import Register from '../register/register';
import './modal.scss';

const Modal = () => {
    const {state, modalHideHandler} = useContext(RateContext);
    const [value, setValue] = useState('login');
    const links = [{name: 'Sign in', id: 'login'}, {name: 'Check-in', id: 'register'}];
    const cls = ['modal'];

    const windowHendler = (id) => {
        setValue(id)
    }

    if(state.showModal) {
        cls.push('modalShow');
    }

    return (
        <div className={cls.join(' ')}>
            <Fragment>
                <div className='modalHead'>
                    <ul>
                        {links.map((item, i) => {
                            return (
                                <li 
                                    style={{fontWeight: item.id === value ? 'bold' : 'normal', cursor: 'pointer'}} 
                                    key={item.name} 
                                    onClick={() => windowHendler(item.id)}>{item.name}
                                </li>
                            )
                        })}
                    </ul>
                    <i className='fa fa-times' aria-hidden = 'true' onClick={modalHideHandler}/>
                </div>
            <hr />
           </Fragment>

           <div style={{textAlign: 'center'}}>
           <h2 style={{color: '#f01f30'}}>{state.error}</h2>
           </div>

           {value === 'register' ? <Register /> : <Login />}
        </div>
    )
}

export default Modal;