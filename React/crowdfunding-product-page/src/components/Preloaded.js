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
    imagesToPreload.push(<img key={image} src={images[image]} alt={image + " preloaded"}/>);
  }
  return <div style={{display: "none"}}>{imagesToPreload}</div>;
}
