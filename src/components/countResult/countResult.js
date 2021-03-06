import React, {useContext} from 'react';
import  { RateContext }  from '../../context/ReteContext';
import './countResult.scss';

const CountResult = () => {
    const {state} = useContext(RateContext);
    return (
        <div className='calcResult'>
            <ul>
                {state.result ? 
                <li><p>
                      <span>{state.inputValue}&nbsp;RUB</span> =
                      <span>{state.result}&nbsp;{state.currencyValue}</span>
                    </p>
                </li> : null }
            </ul>
        </div>
    )
};

export default CountResult;