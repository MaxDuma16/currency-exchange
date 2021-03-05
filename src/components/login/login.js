import React, {Fragment} from 'react';
import Button from '../buttton/button';
import Input from '../input/input';
import './login.scss';

const Login = () => {
    return (
        <Fragment>
            <div className='modalForm'>
                <Input type='email' label = 'Email' />
                <Input type='password' label = 'Password' />
            </div>
            <div className='modalBtn'>
                <Button text='Sing in'/>
            </div>
        </Fragment>
    )
}

export default Login;