import React, {Fragment, useContext} from 'react';
import { RateContext } from '../../context/ReteContext';
import Button from '../buttton/button';
import Input from '../input/input';
import './login.scss';

const Login = () => {
    const { renderInputs } = useContext(RateContext);
    return (
        <Fragment>
            <div className='modalForm'>
                {renderInputs()}
            </div>
            <div className='modalBtn'>
                <Button text='Sing in'/>
            </div>
        </Fragment>
    )
}

export default Login;