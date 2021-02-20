let footerLinks = document.getElementsByClassName("footer-links")[0];
let display = window.getComputedStyle(footerLinks, null).display;
let shareIcon = document.getElementById("share-icon-img");
let btn = document.getElementById("share-button");


const darkenShareBtn = () => {
  btn.style.backgroundColor = "hsl(214, 17%, 51%)";  // desaturated-dark-blue
  shareIcon.src = "./images/icon-share-white.svg";  // white share arrow
}
const lightenShareBtn = () => {
  btn.style.backgroundColor = "hsl(210, 46%, 95%)";  // light-grayish-blue
  shareIcon.src = "./images/icon-share-gray.svg";  // gray share arrow
}


function onClick() {
  if (display == "none") {
    display = footerLinks.style.display = "flex";
    darkenShareBtn();
  } else {
    display = footerLinks.style.display = "none";
    lightenShareBtn();
  }
}
