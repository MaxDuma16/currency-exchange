import { render } from '@testing-library/react';
import React from 'react';
import './App.scss';
import Layout from './components/layout/Layout';

 class App extends React.Component {

  render() {
    return (
      <div>
        <Layout />
      </div>
    )
  }
}

export default App;

