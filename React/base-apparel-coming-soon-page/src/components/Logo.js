import React from 'react';
import logo from '../assets/images/logo.svg';

export default function Logo() {
  return (
      <img
        className="Logo"
        src={logo}
        alt="site logo"
        onClick={() => window.location.reload()}
      />
  );
}