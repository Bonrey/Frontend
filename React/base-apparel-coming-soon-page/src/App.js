import React from 'react';
import './App.scss';

import Logo from './components/Logo';
import Header from './components/Header';
import Form from './components/Form';
import Attribution from './components/Attribution';

function App() {
  return (
    <div className="Wrapper">
      <main className="Main">
        <div className="MainContent">
          <Logo />
          <Header />
          <Form />
        </div>
      </main>
      <Attribution />
    </div>
  );
}

export default App;