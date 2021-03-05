import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';
import { RateContext } from './context/ReteContext';


import CHF from './image/CHF.png';
import CNY from './image/CNY.png';
import EUR from './image/EUR.png';
import GBP from './image/GBP.png';
import JPY from './image/JPY.png';
import RUB from './image/RUB.png';
import USD from './image/USD.png';



 class App extends React.Component {
  constructor(props) {
    super(props); 
      this.state = {
        base: 'USD',
        rate: '',
        data: '',
        currency: {
          'USD': {name: 'Dolar USD', flag: USD, course: '' },
          'CHF': {name: 'Chinese yuan', flag: CHF, course: '' },
          'EUR': {name: 'Euro', flag: EUR, course: '' },
          'GBP': {name: 'Pound Sterling', flag: GBP, course: '' },
          'JPY': {name: 'Japanese yen', flag: JPY, course: '' },
          'RUB': {name: 'Dolar USD', flag: RUB, course: '' },
          'CNY': {name: 'Swiss franc', flag: CNY, course: '' },
        },
        // calc
        inputValue: 100,
        currencyValue: 'USD',
        result: null
      };
  }

  inputValueHandler = (event) => {
    this.setState({inputValue: event.target.value})
  }

  currencyValueHandler = (event) => {
    this.setState({currencyValue: event.target.currency})
  }

  calcHandler = async (value) => {
    let result;
    await fetch('https://api.exchangeratesapi.io/latest?base=RUB')
          .then((responce) => responce.json())
          .then((responce) => {
            result = responce.rates[value] * this.state.inputValue;
          });
          this.setState({result})
  }
  
  componentDidMount() {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`) 
        .then((responce) => responce.json())
        .then((responce) => {
          // console.log(responce);
          const rateArr = ['USD', 'CHF', 'CHF', 'EUR', 'GBP', 'JPY', 'RUB', 'CNY'];
          const currency = {...this.state.currency};

          for(let i = 0; i < rateArr.length; i++) {
            currency[rateArr[i]].course = responce.rates[rateArr[i]]
          }
          this.setState({
            rate: responce.rate,
            data: responce.date,
            currency
          })


        });
  }

  render() {
    return (
        <RateContext.Provider 
        value = {{state: this.state, 
                  inputValueHandler: this.inputValueHandler,
                  currencyValueHandler: this.currencyValueHandler,
                  calcHandler: this.calcHandler
                  }}>
          <Layout />
        </RateContext.Provider>
    )
  }
}

export default App;

