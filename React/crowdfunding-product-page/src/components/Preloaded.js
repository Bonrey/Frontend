import React from 'react';

import iconBookmarkActive from '../assets/images/icon-bookmark-active.svg';
import iconCheck from '../assets/images/icon-check.svg';

const images = {
  iconBookmarkActive: iconBookmarkActive,
  iconCheck: iconCheck
};

export default function Preloaded() {
  let imagesToPreload = [];
  for (let image in images) {
    imagesToPreload.push(<img key={image} src={images[image]} alt={image + " preloaded"} />);
  }
  return <div style={{ display: "none" }}>{imagesToPreload}</div>;
}

export const pledgesDescription = [
  {
    id: "no-reward",
    heading: "Pledge with no reward",
    paragraph: "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email."
  },
  {
    id: "bamboo-stand",
    heading: "Bamboo Stand",
    paragraph: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and\n" +
      "you’ll be added to a special Backer member list.",
  },
  {
    id: "black-edition-stand",
    heading: "Black Edition Stand",
    paragraph: "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer\n" +
      "member list. Shipping is included.",
  },
  {
    id: "mahogany-special-edition",
    heading: "Mahogany Special Edition",
    paragraph: "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added\n" +
      "to our Backer member list. Shipping is included.",
  }
];
