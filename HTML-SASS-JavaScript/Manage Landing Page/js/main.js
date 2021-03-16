// ==============
// ____HEADER____
// ==============
const pageMask = document.getElementById("page-mask");
const headerMenu = document.getElementById("header-menu");
const menuButton = document.querySelector("button.menu-btn");
const menuButtonImage = menuButton.firstElementChild;

let mobileMenuOpened = false;

function openMobileMenu() {
  menuButtonImage.src = "images/icon-close.svg";
  pageMask.classList.remove("page-mask-hidden");
  headerMenu.classList.add("menu-mobile");
  mobileMenuOpened = true;
}

function closeMobileMenu() {
  menuButtonImage.src = "images/icon-hamburger.svg";
  pageMask.classList.add("page-mask-hidden");
  headerMenu.classList.remove("menu-mobile");
  mobileMenuOpened = false;
}

menuButton.addEventListener("click", () => {
  if (mobileMenuOpened) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});


// ==================
// ___TESTIMONIALS___
// ==================
const allSlides = document.querySelectorAll(".slide");
// const essentialSlides = document.querySelectorAll("#anisha, #ali, #richard, #shanai");
// let currentPos = ["first", "second", "third", "fourth"];
// let previousPos = [];

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

// function shiftSlidesPosition(shift) {
//   let result = [];
//   for (let i = 0; i < 4; i++) {
//     result.push(currentPos[(i + shift + 4) % 4]);
//   }
//   previousPos = currentPos;
//   currentPos = result;
// }
//
// function updateSlides(shift) {
//   shiftSlidesPosition(shift);
//   for (let i = 0; i < 4; i++) {
//     essentialSlides[i].classList.replace(previousPos[i], currentPos[i]);
//   }
// }

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", () => {
    colorDot(i);
    //setTimeout(_ => updateSlides(shift), 1000);
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
          allSlides[i].style.transition = "2s";
        }
      }, 500);  // P.S. this number could be smaller
    }, 2000);
    translate = 35.5;
    current = 0;
  }
  colorDot(current);
}

let autoUpdate = setInterval(autoUpdateFunc, 4000);
const testimonials = document.querySelector(".testimonials");
testimonials.addEventListener("mouseenter", () => {
  clearInterval(autoUpdate);
});
testimonials.addEventListener("mouseleave", () => {
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
function mobileDefault() {
  headerMenu.classList.add("menu-hidden");
  menuButton.style.display = "inline-block";
}

function desktopDefault() {
  headerMenu.classList.remove("menu-hidden");
  menuButton.style.display = "none";
  closeMobileMenu();
}

function onWindowResize() {
  if (outerWidth <= 720) {
    mobileDefault();
  } else {
    desktopDefault();
  }
}

addEventListener("resize", onWindowResize);
onWindowResize();