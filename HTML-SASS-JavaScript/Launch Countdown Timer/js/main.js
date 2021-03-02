const circles = document.querySelectorAll("svg circle");

function correctCircleRadius() {
  if (window.outerWidth <= 720) {
    for (let i = 0; i < 16; i++) {
      circles[i].style.r = "3px";
    }
  } else {
    for (let i = 0; i < 16; i++) {
      circles[i].style.r = "6px";
    }
  }
}

window.addEventListener("resize", correctCircleRadius);
correctCircleRadius();


let countDownDate = new Date("Mar 6, 2021 2:18:52").getTime();
// const dateCards = document.querySelectorAll("#days, #hours, #minutes, #seconds");
// const timeLeftUpdate = setInterval(() => {
//   let timeLeft = countDownDate - new Date().getTime();
//   let timeUnits = [
//     Math.floor(timeLeft / (1000 * 60 * 60 * 24)),  // days
//     Math.floor(timeLeft % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),  // hours
//     Math.floor(timeLeft % (1000 * 60 * 60) / (1000 * 60)),  // minutes
//     Math.floor((timeLeft % (1000 * 60)) / 1000)  // seconds
//   ];
//
//   for (let i = 0; i < 4; i++) {
//     dateCards[i].innerHTML = ("0" + timeUnits[i]).slice(-2);
//   }
// }, 1000);
