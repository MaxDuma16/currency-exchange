import React, {Fragment} from 'react';
import Login from '../login/login';
import Register from '../register/register';
import './modal.scss';

const Modal = () => {
    return (
        <div className='modal'>
            <Fragment>
                <div className='modalHead'>
                    <ul>
                        <li>Sign in</li>
                        <li> Check-in</li>
                    </ul>
                    <i className='fa fa-times' aria-hidden = 'true'/>
                </div>
            <hr />
           </Fragment>
           <Login />
           {/* <Register /> */}
        </div>
    )
}

export default Modal;