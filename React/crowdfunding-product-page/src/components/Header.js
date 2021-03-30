import React from 'react';

import logo from '../assets/images/logo.svg';

import AnchorLink from 'react-anchor-link-smooth-scroll'

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="site logo" onClick={_ => window.location.reload()} />
      <div className="header-links">
        <AnchorLink className="nav-link" href="#about">About</AnchorLink>
        <AnchorLink className="nav-link" href="#discover">Discover</AnchorLink>
        <AnchorLink className="nav-link" href="#get-started">Get Started</AnchorLink>
      </div>
    </header>
  );
}