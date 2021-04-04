import React from 'react';

import logo from '../assets/images/logo.svg';
import showMenu from '../assets/images/icon-hamburger.svg';
import closeMenu from '../assets/images/icon-close-menu.svg';

export default function Header(props) {
  return (
    <header id="header">
      <img src={logo} alt="site logo" onClick={_ => window.location.reload()} />
      {(props.width > 720 || props.menuShown) &&
      <div className={`header-links ${props.width <= 720 ? props.className : ""}`}>
        <a
          className="nav-link"
          href="#about"
          onClick={_ => props.onClick("anchor")}>About
        </a>
        <a
          className="nav-link"
          href="#discover"
          onClick={_ => props.onClick("anchor")}>Discover
        </a>
        <a
          className="nav-link"
          href="#get-started"
          onClick={_ => props.onClick("anchor")}>Get Started
        </a>
      </div>}
      {props.width <= 720 &&
      <button aria-label="menu button" className="menu-btn" onClick={props.onClick}>
        <img src={props.className === "show-menu" ? closeMenu : showMenu} alt="menu btn" />
      </button>}
    </header>
  );

}