const signupForm = document.forms["signup-form"];
const inputs = ["first-name", "last-name", "email", "password"];
const placeholders = { "first-name": "First Name", "last-name": "Last Name", "email": "Email Address", "password": "Password" }

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
});


function defaultInput(name) {
  let input = signupForm[name];

  input.style.border = "1px solid hsl(246, 25%, 77%)";
  input.placeholder = placeholders[input.name];
  input.previousElementSibling.style.display = "none";  // hide error icon
  input.nextElementSibling.style.display = "none";  // hide <p> text

  if (input.classList.contains("red-placeholder")) {
    input.classList.remove("red-placeholder");
    input.nextElementSibling.innerHTML = "<em>Email cannot be empty</em>";
  }
}


function errorInput(name) {
  let input = signupForm[name];

  input.style.border = "1.5px solid hsl(0, 100%, 74%)";
  input.placeholder = "";
  input.previousElementSibling.style.display = "inline";  // show error icon
  input.nextElementSibling.style.display = "block";  // show <p> tag
  if (input.name == "email") {
    input.nextElementSibling.innerHTML = "<em>Email cannot be empty</em>";
  }

  if (input.value != "") {  // only in case of incorrect email value
    input.placeholder = "email@example.com";
    input.value = "";
    input.nextElementSibling.innerHTML = "<em>Looks like this is not an email</em>";
    input.classList.add("red-placeholder");
  }
}


// reset the current input field
function onFocus(input) {
  defaultInput(input.name);
}


// check the fields after pressing the Submit button
function validateForm() {
  for (let i = 0; i < 4; i++) {
    if (signupForm[inputs[i]].value == "" ||
      i == 2 && !/\w+@\w+\.\w+/.test(signupForm[inputs[i]].value)) {
      errorInput(inputs[i]);
    }
  }
}


// reset the form when there is a mouse click outside
let formContainer = document.getElementsByClassName("form-container")[0];
document.addEventListener('click', (event) => {
  let isClickInsideElement = formContainer.contains(event.target);
  if (!isClickInsideElement) {
    for (let i = 0; i < 4; i++) {
      defaultInput(inputs[i]);
    }
  }
});
