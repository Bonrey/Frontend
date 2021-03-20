import React from 'react';
import './App.scss';

import Header from './components/Header';
import Hero from './components/Hero';
import Form from './components/Form';
import Attribution from './components/Attribution';

function App() {
  return (
    <div className="wrapper">
      <div>
        <Header />
        <Form />
      </div>
      <Hero />
      {/*<Attribution />*/}
    </div>
  );
}

export default App;