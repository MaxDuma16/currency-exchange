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
import Modal from './components/modal/modal';
import Dark from './components/dark/dark';
import Input from './components/input/input';


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
 class App extends React.Component {
  constructor(props) {
    super(props); 
      this.state = {
        auth: false,
        error: '',
        formControls: {
            email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Enter the correct value',
                    valid: false,
                    touched: false,
                    validation: {
                      required: true,
                      email: true
                    }
                  },
            password: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Enter the correct password',
                    valid: false,
                    touched: false,
                    validation: {
                      required: true,
                      minLenght: 6
                    }
        }
      },

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
        sampleList: '',
        // Modal
        showModal: false,
        isFromValid: false
      }
  }

  loginHendler = async () => {
    const authData = {email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const responce = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD74cLC1RYoHk6vWTpbd4Obx49mDPesGxw', authData)
        if(responce.data.idToken) {
          const formControls = {...this.state.formControls};
          formControls.email.value = '';
          formControls.password.value = '';
          this.setState({auth: true, showModal: false, error: '', formControls: formControls})
        } 
    } catch(e) {
      console.log(e);
      this.setState({error: 'Error'})
    }
  }

  registerHendler = async () => {
    const authData = {email: this.state.formControls.email.value,
                      password: this.state.formControls.password.value,
                      returnSecureToken: true
                      }
    try {
      const responce = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyD74cLC1RYoHk6vWTpbd4Obx49mDPesGxw', authData)
        if(responce.data.idToken) {
          const formControls = {...this.state.formControls};
          formControls.email.value = '';
          formControls.password.value = '';
          this.setState({auth: true, showModal: false, error: '', formControls: formControls})
        } 
    } catch(e) {
      console.log(e);
      this.setState({error: 'Error'})
    }
  }

  modalShowHandler = () => {
    this.setState({showModal: true})
  }

  modalHideHandler = () => {
    this.setState({showModal: false})
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

  sampleRemove = async (id) => {
    let sampleList = {...this.state.sampleList};
    delete sampleList[id];
    this.setState({sampleList});

    await axios.delete(`https://currency-exchange-be052-default-rtdb.firebaseio.com/sample/${id}.json`)
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

  validateControl(value, validation) {
    if(!validation) {
      return true
    }
    let isValid = true;
    if(validation.required) {
      isValid = value.trim() !=='' && isValid
    }

    if(validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if(validation.minLenght) {
      isValid = value.length >= validation.minLenght && isValid
    }

    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};

    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control

    let isFromValid = 'true';

    Object.keys(formControls).forEach(name => {
      isFromValid = formControls[name].valid && isFromValid;
    })

    this.setState({formControls, isFromValid})

  }

  renderInputs = () => {
      return Object.keys(this.state.formControls).map((controlName, i) => {
        const control = this.state.formControls[controlName];
        return (
          <Input 
              key = {controlName + i}
              type = {control.type}
              value = {control.value}
              valid = {control.valid}
              touched = {control.touched}
              label = {control.label}
              errorMessage = {control.errorMessage}
              shouldValidate = {true}
              onChange = {(event) => this.onChangeHandler(event, controlName)}
          />
        )
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
                  dataWrite: this.dataWrite,
                  sampleRemove: this.sampleRemove,
                  renderInputs: this.renderInputs,
                  modalShowHandler: this.modalShowHandler,
                  modalHideHandler: this.modalHideHandler,
                  loginHendler: this.loginHendler,
                  registerHendler: this.registerHendler
                  }}>
          <Dark showModal = {this.state.showModal} 
                 modalHideHandler = {this.modalHideHandler}  />
          <Modal />
          <Layout />
        </RateContext.Provider>
    )
  }
}

export default App;

