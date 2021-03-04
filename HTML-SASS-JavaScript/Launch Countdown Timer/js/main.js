const circles = document.querySelectorAll("svg circle");

function correctCircleRadius() {
  if (window.outerWidth <= 720) {
    for (let i = 0, len = circles.length; i < len; i++) {
      circles[i].style.r = "3px";
    }
  } else {
    for (let i = 0, len = circles.length; i < len; i++) {
      circles[i].style.r = "6px";
    }
  }
}

window.addEventListener("resize", correctCircleRadius);
correctCircleRadius();


// let countDownDate = new Date("Mar 6, 2021 2:18:52").getTime();
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


let cards = {
  "days": {
    "hiddenNumber": document.querySelector("#days .card__bottom-bg__number"),
    "topNumber": document.querySelector("#days .card__top__number"),
    "bottomNumber": document.querySelector("#days .card__bottom__number"),
    "bottomHalf": document.querySelector("#days .card__bottom")
  },
  "hours": {
    "hiddenNumber": document.querySelector("#hours .card__bottom-bg__number"),
    "topNumber": document.querySelector("#hours .card__top__number"),
    "bottomNumber": document.querySelector("#hours .card__bottom__number"),
    "bottomHalf": document.querySelector("#hours .card__bottom")
  },
  "minutes": {
    "hiddenNumber": document.querySelector("#minutes .card__bottom-bg__number"),
    "topNumber": document.querySelector("#minutes .card__top__number"),
    "bottomNumber": document.querySelector("#minutes .card__bottom__number"),
    "bottomHalf": document.querySelector("#minutes .card__bottom")
  },
  "seconds": {
    "hiddenNumber": document.querySelector("#seconds .card__bottom-bg__number"),
    "topNumber": document.querySelector("#seconds .card__top__number"),
    "bottomNumber": document.querySelector("#seconds .card__bottom__number"),
    "bottomHalf": document.querySelector("#seconds .card__bottom")
  }
};

// let timeUnits = [
//   Number.parseInt(cards.days.hiddenNumber.innerText),     // days
//   Number.parseInt(cards.hours.hiddenNumber.innerText),    // hours
//   Number.parseInt(cards.minutes.hiddenNumber.innerText),  // minutes
//   Number.parseInt(cards.seconds.hiddenNumber.innerText)   // seconds
// ];

let timeUnits = [1, 1, 0, 5];

function flipCard(card, val) {
  card.hiddenNumber.innerText = ("0" + val).slice(-2);
  card.bottomNumber.style.transition = "1s";
  card.bottomHalf.style.transition = "1s";

  card.bottomHalf.style.transform = "rotateX(180deg)";
  card.bottomHalf.style.backgroundColor = "#292b40";

  card.bottomNumber.style.transform = "translate(-50%, -50%) scaleY(-1)";
  card.bottomNumber.style.color = "hsla(345, 95%, 68%, 0.7)";
}

function restoreDefault(card, val) {
  card.topNumber.innerText = ("0" + val).slice(-2);
  card.bottomNumber.style.transition = "none";
  card.bottomHalf.style.transition = "none";

  card.bottomHalf.style.transform = "rotateX(0deg)";
  card.bottomHalf.style.backgroundColor = "#343650";

  card.bottomNumber.style.transform = "translate(-50%, -50%)";
  card.bottomNumber.style.color = "hsl(345, 95%, 68%)";
}

const flipInterval = setInterval(() => {
  if (timeUnits[0] === 0 && timeUnits[1] === 0 && timeUnits[2] === 0 && timeUnits[3] === 1) {
    clearInterval(flipInterval);  // setInterval() will still work once (till the end of this block)
    setTimeout(() => { alert("End!"); }, 2000);
  }
  timeUnits[3] = (timeUnits[3] + 59) % 60;
  flipCard(cards.seconds, timeUnits[3]);
  if (timeUnits[3] === 59) {
    timeUnits[2] = (timeUnits[2] + 59) % 60;
    flipCard(cards.minutes, timeUnits[2]);
  }
  if (timeUnits[3] === 59 && timeUnits[2] === 59) {
    timeUnits[1] = (timeUnits[1] + 23) % 24;
    flipCard(cards.hours, timeUnits[1]);
  }
  if (timeUnits[3] === 59 && timeUnits[2] === 59 && timeUnits[1] === 23) {
    timeUnits[0]--;
    flipCard(cards.days, timeUnits[0]);
  }

  setTimeout(() => {
    let i = 0;
    for (let card in cards) {
      cards[card].bottomNumber.innerText = ("0" + timeUnits[i++]).slice(-2);
    }
  }, 300);

  setTimeout(() => {
    let i = 0;
    for (let card in cards) {
      restoreDefault(cards[card], timeUnits[i++]);
    }
  }, 900);
}, 1000);