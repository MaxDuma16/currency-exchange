import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';
import { RateContext } from './context/ReteContext';
import axios from 'axios';

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
        result: null,
        // sample
        sample: {base: 'USD', base2: 'RUB', date: '', course: ''},
        sampleList: ''
      };
  }

  baseHandler = (event) => {
    this.setState({sample: {...this.state.sample, base: event.target.value}})
  }

  base2Handler = (event) => {
    this.setState({sample: {...this.state.sample, base2: event.target.value}})
  }
  sampleDateHandler = (event) => {
    this.setState({sample: {...this.state.sample, data: event.target.value}})
  }

  inputValueHandler = (event) => {
    this.setState({inputValue: event.target.value,
                   result: null
                  });
  }

  currencyValueHandler = (event) => {
    this.setState({currencyValue: event.target.currency,
                   result: null
                  });
  }

  calcHandler = async (value) => {
    let result;
    await fetch('https://api.exchangeratesapi.io/latest?base=RUB')
          .then((response) => response.json())
          .then((response) => {
            result = response.rates[value] * this.state.inputValue;
          });
          this.setState({result})
  }

  dataWrite = async () => {
    await fetch(`https://api.exchangeratesapi.io/${this.state.sample.date}?base=${this.state.sample.base}`) 
      .then((response) => response.json())
      .then((response) => {
        this.setState({sample: {...this.state.sample, course: response.rates[this.state.sample.base2]}})
      })

    await axios.post('https://currency-exchange-be052-default-rtdb.firebaseio.com/sample.json', this.state.sample)
      .then((response) => {
      return('')
    })
    await axios('https://currency-exchange-be052-default-rtdb.firebaseio.com/sample.json')
      .then((response) => {
        this.setState({sampleList: response.data})
      })
  }
  
  componentDidMount() {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`) 
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          const rateArr = ['USD', 'CHF', 'CHF', 'EUR', 'GBP', 'JPY', 'RUB', 'CNY'];
          const currency = {...this.state.currency};

          for(let i = 0; i < rateArr.length; i++) {
            currency[rateArr[i]].course = response.rates[rateArr[i]]
          }
          this.setState({
            rate: response.rate,
            data: response.date,
            currency
          })
        });

       axios('https://currency-exchange-be052-default-rtdb.firebaseio.com/sample.json')
        .then((response) => {
          if (response.data === null) {
             return (null)
          } else {
            this.setState({sampleList: response.data})
          }
        })
  }

  render() {
    return (
        <RateContext.Provider 
        value = {{state: this.state, 
                  inputValueHandler: this.inputValueHandler,
                  currencyValueHandler: this.currencyValueHandler,
                  calcHandler: this.calcHandler,
                  baseHandler: this.baseHandler,
                  base2Handler: this.base2Handler,
                  sampleDateHandler: this.sampleDateHandler,
                  dataWrite: this.dataWrite
                  }}>
          <Layout />
        </RateContext.Provider>
    )
  }
}

export default App;

