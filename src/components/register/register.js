import React, {Fragment, useContext} from 'react';
import { RateContext } from '../../context/ReteContext';
import Button from '../buttton/button';
import Input from '../input/input';
import './register.scss';

const Register = () => {
    const { renderInputs, state, registerHendler } = useContext(RateContext);
    return (
        <Fragment>
            <div className='modalForm'>
            {renderInputs()}
            </div>
            <div className='modalBtn'>
                <Button 
                    text='Check-in' 
                    disabled={!state.isFormValid}
                    click = {registerHendler}
                    />
            </div>
        </Fragment>
    )
}

export default Register;