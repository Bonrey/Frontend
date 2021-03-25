import React from 'react';

import logo from '../assets/images/logo.svg';

export default function Header() {
  return (
    <header className="Header">
      <img src={logo} alt="site logo" />
      <div className="HeaderLinks">
        <a href="/#">About</a>
        <a href="/#">Discover</a>
        <a href="/#">Get Started</a>
      </div>
    </header>
  );
}