import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';
import { RateContext } from './context/ReteContext';


import UAN from './image/UA.png';
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
          'USD': {name: 'Dolar USD', flag: USD, course: '99999' },
          'UAN': {name: 'Ukrainian Hryvnia', flag: UAN, course: '99999' },
          'CHF': {name: 'Chinese yuan', flag: CHF, course: '99999' },
          'EUR': {name: 'Euro', flag: EUR, course: '99999' },
          'GBP': {name: 'Pound Sterling', flag: GBP, course: '99999' },
          'JPY': {name: 'Japanese yen', flag: JPY, course: '99999' },
          'RUB': {name: 'Dolar USD', flag: RUB, course: '99999' },
          'CNY': {name: 'Swiss franc', flag: CNY, course: '99999' },
        }
      };
  }

  render() {
    return (
        <RateContext.Provider value = {{state: this.state}}>
          <Layout />
        </RateContext.Provider>
    )
  }
}

export default App;

