import React, {useContext} from 'react';
import { RateContext } from '../../context/ReteContext';
import './countResult.scss';

const CountResult = () => {
    const {state} = useContext(RateContext);
    return (
        <div className='calcResult'>
            <ul>
                <li><p>
                      <span>{state.input.value}&nbsp;RUB</span> =
                      <span>{state.result}&nbsp;{state.currencyValue}</span>
                    </p>
                </li>
            </ul>
        </div>
    )
};

export default CountResult;