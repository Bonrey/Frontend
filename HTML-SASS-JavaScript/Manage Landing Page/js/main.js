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


// ==============
// ____FOOTER____
// ==============
const form = document.querySelector(".subscription-form form");
const submitButton = document.querySelector("input[type=submit]");
const textField = document.querySelector("input[type=text]");

form.addEventListener("submit", e => e.preventDefault());

function defaultInputField() {
  textField.placeholder = "Updates in your inbox…";
  textField.classList.replace("error-text", "default-text");
}

function errorInputField() {
  textField.value = "";
  textField.placeholder = "example@mail.ru";
  textField.classList.replace("default-text", "error-text");
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