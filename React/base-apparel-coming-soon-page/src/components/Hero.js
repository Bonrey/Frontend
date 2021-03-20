import React from 'react';
import heroImage from '../assets/images/hero-desktop.jpg';
import '../styles/components/_hero.scss';

export default function Hero() {
  return (
    <img
      src={heroImage}
      alt={"Hero"}
      width={"32px"}
      height={"100%"}/>
  );
}