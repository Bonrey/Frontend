// ==============
// ____HEADER____
// ==============
const pageMask = document.getElementById("page-mask");
const headerMenu = document.getElementById("header-menu");
const menuButton = document.querySelector("button.menu-btn");
const menuButtonImage = menuButton.firstElementChild;

let menuOpened = false;
menuButton.addEventListener("click", _ => {
  menuButtonImage.src = menuOpened ? "images/icon-hamburger.svg" : "images/icon-close.svg";
  pageMask.style.animation = headerMenu.style.animation = menuOpened ? "hide 1s 1" : "show 1s 1";
  menuButtonImage.style.animation = menuOpened ? "rotate-clockwise 1s 1" : "rotate-counterclockwise 1s 1";
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
      // without this timeout, the above translateX would execute WITH transition of 1s
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

let autoUpdate = setInterval(autoUpdateFunc, 4000);
const testimonialsSlider = document.querySelector(".testimonials-slider");
testimonialsSlider.addEventListener("mouseenter", () => {
  clearInterval(autoUpdate);
});
testimonialsSlider.addEventListener("mouseleave", () => {
  autoUpdate = setInterval(autoUpdateFunc, 4000);
});


// ==============
// ____FOOTER____
// ==============
const form = document.querySelector(".subscription-form form");
const submitButton = document.querySelector("input[type=submit]");
const textField = document.querySelector("input[type=text]");
const textFieldErrorLabel = form.nextElementSibling;

form.addEventListener("submit", e => e.preventDefault());

function defaultInputField() {
  textField.placeholder = "Updates in your inbox…";
  textField.classList.replace("error-text", "default-text");
  textFieldErrorLabel.style.visibility = "hidden";
}

function errorInputField() {
  textField.value = "";
  textField.placeholder = "example@mail.ru";
  textField.classList.replace("default-text", "error-text");
  textFieldErrorLabel.style.visibility = "visible";
}

submitButton.addEventListener("click", () => {
  if (!/\w+@\w+\.\w+/.test(textField.value)) {
    errorInputField();
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


// ======================
// ___ON WINDOW RESIZE___
// ======================
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
onWindowResize();