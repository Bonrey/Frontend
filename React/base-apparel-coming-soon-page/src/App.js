import React from 'react';
import './App.scss';

import Logo from './components/Logo';
import Header from './components/Header';
import Form from './components/Form';
import Hero from './components/Hero';
import Attribution from './components/Attribution';

function App() {
  return (
    <div className="wrapper">
      <main>
        <Logo />
        <div className="main-content">
          <Header />
          <Form />
        </div>
      </main>
      <Hero />
      {/*<Attribution />*/}
    </div>
  );
}

export default App;