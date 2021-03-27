import './App.css';

import React from 'react';

import Join from './components/Join';
import Subscription from './components/Subscription';
import Why from './components/Why';

export default function App() {
  return (
    <div>
      <Join />
      <Subscription />
      <Why />
    </div>
  );
}
