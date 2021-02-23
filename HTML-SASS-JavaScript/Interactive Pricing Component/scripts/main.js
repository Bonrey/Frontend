let discountText = document.getElementById("discount-text");
let slider = document.getElementById("slider");
let toggle = document.getElementById("toggle-button");
let btn = document.getElementById("main-bottom-button");

let pageviewsNumber = document.getElementById("pageviews-number");
let moneyValue = document.getElementById("money-value");

const pageviews = ["1k", "5k", "10k", "25k", "50k", "100k", "200k", "300k", "500k", "750k", "1m"];
const moneyValues = [0.5, 2, 3, 5, 10, 16, 30, 42, 60, 80, 100];


btn.addEventListener("click", () => {
  location.reload();
});


// update discount label depending on the screen size
function onWindowResize() {
  if (window.outerWidth <= 600) {
    discountText.innerText = "-25%";
  } else {
    discountText.innerText = "25% discount";
  }
}

window.addEventListener("resize", onWindowResize);
onWindowResize();


// toggle event listener
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    moneyValue.innerText = (moneyValues[slider.value] * 9).toFixed(2);
    moneyValue.nextElementSibling.innerText = "/ year";
  } else {
    moneyValue.innerText = moneyValues[slider.value].toFixed(2);
    moneyValue.nextElementSibling.innerText = "/ month";
  }
});


// slider event listener
slider.addEventListener("input", () => {
  let value = slider.value;
  // since 0 <= value <= 10 (see html), % can be found by *10
  slider.style.background = "linear-gradient(to right, hsl(174, 77%, 80%) 0% " + value * 10 + "%, hsl(224, 65%, 95%)" + value * 10 + "% 100%)";

  pageviewsNumber.innerText = pageviews[value];
  // *9, since 12 months * 25 discount = 9
  moneyValue.innerText = (toggle.checked ? moneyValues[value] * 9 : moneyValues[value]).toFixed(2);
});
