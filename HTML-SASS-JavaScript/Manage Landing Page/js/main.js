// ==============
// ____HEADER____
// ==============
const btnSound = new Audio("media/button-click.ogg");
const pageMask = document.getElementById("page-mask");
const headerMenu = document.getElementById("header-menu");
const menuButton = document.querySelector("button.menu-btn");
const menuButtonImage = menuButton.firstElementChild;

let menuOpened = false;
menuButton.addEventListener("click", _ => {
  btnSound.play();
  // to prevent the user from clicking too much
  menuButton.style.pointerEvents = "none";
  setTimeout(_ => menuButton.style.pointerEvents = "auto", 1000);
  // some animation and display changes
  menuButtonImage.src = menuOpened ? "images/icon-hamburger.svg" : "images/icon-close.svg";
  pageMask.style.animation = headerMenu.style.animation = menuOpened ? "hide 1050ms 1" : "show 1s 1";
  menuButtonImage.style.animation = menuOpened ? "rotate-clockwise 1s 1" : "rotate-counterclockwise 1s 1";
  setTimeout(_ => pageMask.style.animation = headerMenu.style.animation = menuButtonImage.style.animation = "none", 1000);
  // settings after animation is completed
  setTimeout(_ => {
    pageMask.style.display = menuOpened ? "none" : "block";
    headerMenu.style.display = menuOpened ? "none" : "flex";
    headerMenu.classList.toggle("menu-mobile");
    menuOpened = !menuOpened;
  }, menuOpened ? 1000 : 0);
});


// ==================
// ___TESTIMONIALS___
// ==================
const allSlides = document.querySelectorAll(".slide");
for (let i = 0, offset = -88; i < allSlides.length; i++, offset += 35.5) {
  allSlides[i].style.left = `calc(50% + ${offset}rem)`;
}

const dotClickAudio = new Audio("media/testimonials-click.wav");
const dots = document.querySelectorAll(".dot");
let [translate, current] = [0, 1];

function colorDot(ind) {
  for (let i = 0; i < 4; i++) {
    dots[i].style.backgroundColor = "transparent";
  }
  dots[ind].style.backgroundColor = "hsl(12, 88%, 59%)";
}

function animateSlides() {
  for (let i = 0; i < allSlides.length; i++) {
    allSlides[i].style.transform = `translateX(${translate}rem)`;
  }
}

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", () => {
    dotClickAudio.play();
    colorDot(i);
    translate += (current - i) * 35.5;
    animateSlides();
    current = i;
  });
}

// automatically update testimonials
function autoUpdateFunc() {
  translate -= 35.5;
  animateSlides();
  if (current++ === 3) {
    setTimeout(() => {
      for (let i = 0; i < allSlides.length; i++) {
        allSlides[i].style.transition = "none";
        allSlides[i].style.transform = "translateX(35.5rem)";
      }
      // without this timeout, the above translateX would execute WITH transition of 2s
      setTimeout(() => {
        for (let i = 0; i < allSlides.length; i++) {
          allSlides[i].style.transition = "transform 2s";
        }
      }, 500);  // P.S. this number could be smaller
    }, 2000);
    translate = 35.5;
    current = 0;
  }
  colorDot(current);
}

let autoUpdate = setInterval(autoUpdateFunc, 5000);
const testimonialsSlider = document.querySelector(".testimonials-slider");
testimonialsSlider.addEventListener("mouseenter", () => {
  clearInterval(autoUpdate);
});
testimonialsSlider.addEventListener("mouseleave", () => {
  autoUpdate = setInterval(autoUpdateFunc, 5000);
});


// ==============
// ____FOOTER____
// ==============
const errorSound = new Audio("media/error.flac");
const form = document.querySelector(".subscription-form form");
const submitButton = document.querySelector("input[type=submit]");
const textField = document.querySelector("input[type=text]");
const textFieldErrorLabel = form.nextElementSibling;

errorSound.volume = 0.7;
form.addEventListener("submit", e => e.preventDefault());

function defaultInputField() {
  textField.placeholder = "Updates in your inbox…";
  textField.classList.replace("error-text", "default-text");
  textFieldErrorLabel.style.opacity = "0";
}

function errorInputField() {
  textField.value = "";
  textField.placeholder = "example@mail.ru";
  textField.classList.replace("default-text", "error-text");
  textFieldErrorLabel.style.opacity = "1";
  textField.style.animation = "shake 0.4s 1";
  setTimeout(_ => textField.style.animation = "none", 400);
}

submitButton.addEventListener("click", _ => {
  if (!/\w+@\w+\.\w+/.test(textField.value)) {
    errorSound.play();
    errorInputField();
  } else {
    btnSound.play();
  }
});

textField.addEventListener("focus", () => {
  defaultInputField();
});

document.addEventListener("click", e => {
  if (!form.contains(e.target)) {
    defaultInputField();
  }
});


// ===================
// ____ATTRIBUTION____
// ===================
const attrButton = document.getElementById("attribution-image");
const attrText = document.querySelector(".attribution-text");
const attrSound = new Audio("media/attr-click.wav");
attrSound.volume = 0.5;
let attrShown = false;

attrButton.addEventListener("click", _ => {
  attrSound.play();
  attrButton.style.pointerEvents = "none";
  setTimeout(_ => attrButton.style.pointerEvents = "auto", 1000);
  if (attrShown) {
    attrText.style.animation = "hide-attr 1s 1";
    setTimeout(_ => attrText.style.display = "none", 950);
  } else {
    attrText.style.animation = "show-attr 1s 1";
    attrText.style.display = "block";
  }
  setTimeout(_ => attrText.style.animation = "none", 1000);
  attrShown = !attrShown;
});

attrButton.addEventListener("mouseenter", _ => attrButton.style.opacity = "1");
attrButton.addEventListener("mouseleave", _ => attrButton.style.opacity = attrShown ? "1" : "0.5");


// ==================
// ___OTHER SOUNDS___
// ==================
const elements = document.querySelectorAll(".social-media__links a, .get-started-btn");
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", _ => {
    btnSound.play();
  });
}


// ========================
// __FIRST TIME ANIMATION__
// ========================
if (outerWidth > 720) {
  document.querySelector("header").style.animation = "show-header 1s ease-out 1";
  document.querySelector(".intro-text").style.animation = "intro-text-show 1s ease-out 1";
  document.querySelector(".intro-img").style.animation = "intro-image-show 1s ease-out 1";
}


// ====================
// __ON WINDOW RESIZE__
// ====================
function onWindowResize() {
  if (outerWidth <= 720) {
    headerMenu.style.display = menuOpened ? "flex" : "none";
    menuButton.style.display = "flex";
  } else {
    headerMenu.style.display = "block";
    pageMask.style.display = menuButton.style.display = "none";
    headerMenu.style.animation = menuButtonImage.style.animation = "none";
    menuButtonImage.src = "images/icon-hamburger.svg";
    headerMenu.classList.remove("menu-mobile");
    menuOpened = false;
  }
}

addEventListener("resize", onWindowResize);
onWindowResize();  // to set the correct styles for a mobile/desktop
