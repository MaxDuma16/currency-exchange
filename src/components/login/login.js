import React, {Fragment, useContext} from 'react';
import { RateContext } from '../../context/ReteContext';
import Button from '../buttton/button';
import './login.scss';

const Login = () => {
    const { renderInputs, state, loginHendler } = useContext(RateContext);
    return (
        <Fragment>
            <div className='modalForm'>
                {renderInputs()}
            </div>
            <div className='modalBtn'>
                <Button 
                    text='Sing in' 
                    disabled={!state.isFormValid}
                    click={loginHendler}
                    />
            </div>
        </Fragment>
    )
}

export default Login;