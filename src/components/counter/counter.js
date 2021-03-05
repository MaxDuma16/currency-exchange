import React, {useContext} from 'react';
import { RateContext } from '../../context/ReteContext';
import './counter.scss';
import Button from '../buttton/button';

const Counter = () => {
    const {state, inputValueHandler, currencyValueHandler, calcHandler} = useContext(RateContext);
    return (
        <div className= 'calcHead'>

            <div><h4>I want to exchange:</h4></div>
            <div className='operation'>
                <span> <input type='number' value = {state.inputValue}
                        onChange={inputValueHandler}/>&nbsp;RUB</span>

                <select onChange={currencyValueHandler}>
                    {Object.keys(state.currency).map((item, i) => {
                        return (
                            <option key={item}>{item}</option>
                        )
                    })}
                </select>
                <Button text = 'Quantify' click = {calcHandler} arg = {state.currencyValue}/>
                {/* <button onClick={() => calcHandler(state.currencyValue)}>Quantify</button> */}
            </div>

        </div>
    )
}

export default Counter;