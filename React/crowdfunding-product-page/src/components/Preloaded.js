import React from 'react';

import logo from '../assets/images/logo.svg';
import logoMastercraft from '../assets/images/logo-mastercraft.svg';
import iconBookmarkDefault from '../assets/images/icon-bookmark-default.svg';
import iconBookmarkActive from '../assets/images/icon-bookmark-active.svg';
import iconCheck from '../assets/images/icon-check.svg';

export const images = {
  logo: logo,
  logoMastercraft: logoMastercraft,
  iconBookmarkDefault: iconBookmarkDefault,
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
