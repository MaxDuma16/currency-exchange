import React, {Fragment} from 'react';
import Button from '../buttton/button';
import Input from '../input/input';
import './register.scss';

const Register = () => {
    return (
        <Fragment>
            <div className='modalForm'>
            <Input type='email' label = 'Email' />
            <Input type='password' label = 'Password' />
            </div>
            <div className='modalBtn'>
                <Button text='Check-in'/>
            </div>
        </Fragment>
    )
}

export default Register;