import React from 'react';
import heroImage from '../assets/images/hero-desktop.jpg';

export default function Hero() {
  return (
    <img
      className="hero"
      src={heroImage}
      alt="Hero"
    />
  );
}