const email = document.querySelector("input[type='text']");
const submitBtn = document.getElementsByTagName("button")[0];
const errorText = document.getElementsByClassName("error-text")[0];
const inputField = document.getElementsByClassName("input-field")[0];

let invalidInputValue = false;


// prevent the form from submitting (its default behavior)
const form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", (e) => {
  e.preventDefault();
});


// handle the input field value
const defaultInput = () => {
  email.style.borderColor = "hsl(0, 0%, 59%)";
  errorText.style.display = "none";
  inputField.style.height = "auto";
  email.placeholder = "Your email address...";
  submitBtn.style.marginTop = "0";
  if (email.classList.contains("red-placeholder")) {
    email.classList.remove("red-placeholder");
  }
}

const invalidInput = () => {
  email.value = "";
  email.style.borderColor = "hsl(354, 100%, 66%)";
  errorText.style.display = "block";
  email.placeholder = "example@mail.com";
  email.classList.add("red-placeholder");
  if (window.outerWidth <= 600) {
    submitBtn.style.marginTop = "20px";
  }
}


// when you click the submit button
submitBtn.addEventListener("click", () => {
  if (email.value === "" || email.value == null || !/\w+@\w+\.\w+/.test(email.value)) {
    invalidInputValue = true;
    invalidInput();
  } else {
    location.reload();
  }
});


// when you are typing
email.addEventListener("focus", () => {
  invalidInputValue = false;
  defaultInput();
  email.style.borderColor = "hsl(209, 33%, 12%)";
});


// when you click outside the form
document.addEventListener("click", (e) => {
  if (!form.contains(e.target)) {
    invalidInputValue = false;
    defaultInput()
  }
});


// when you resize the window with the input error message
window.addEventListener("resize", () => {
  if (invalidInputValue && window.outerWidth <= 600) {
    submitBtn.style.marginTop = "20px";
  } else {
    submitBtn.style.marginTop = "0";
  }
});


// remove focus from the footer links after clicking
const links = document.querySelectorAll("a");
for (let i = 0; i < 3; i++) {
  links[i].addEventListener("click", () => {
    links[i].blur();
  });
}
