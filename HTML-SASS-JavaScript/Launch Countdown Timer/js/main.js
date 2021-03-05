const circles = document.querySelectorAll("svg circle");

// correctly resize svg circles depending on the screen size
function correctCircleRadius() {
  if (window.outerWidth <= 720) {
    for (let i = 0, len = circles.length; i < len; i++) {
      circles[i].style.r = "0.9vw";
    }
  } else {
    for (let i = 0, len = circles.length; i < len; i++) {
      circles[i].style.r = "6px";
    }
  }
}

window.addEventListener("resize", correctCircleRadius);
correctCircleRadius();


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

let timeUnits = [
  Number.parseInt(cards.days.hiddenNumber.innerText),     // days
  Number.parseInt(cards.hours.hiddenNumber.innerText),    // hours
  Number.parseInt(cards.minutes.hiddenNumber.innerText),  // minutes
  Number.parseInt(cards.seconds.hiddenNumber.innerText)   // seconds
];

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


let finished = false;
const heading = document.getElementsByTagName("h1")[0];
const fini = () => {
  finished = true;
  // setInterval() will still work once (one last iteration that has already started)
  clearInterval(flipInterval);
  setTimeout(() => {
    let i = 0, endMessage = ["F", "I", "N", "I"];
    for (let card in cards) {
      cards[card].topNumber.style.transition = "opacity 2s";
      cards[card].topNumber.style.opacity = "0";

      cards[card].bottomNumber.style.transition = "opacity 2s";
      cards[card].bottomNumber.style.opacity = "0";

      heading.style.transition = "opacity 2s";
      heading.style.opacity = "0";

      setTimeout(() => {
        cards[card].topNumber.innerText = endMessage[i];
        cards[card].bottomNumber.innerText = endMessage[i++];
        cards[card].topNumber.style.opacity = "1";
        cards[card].bottomNumber.style.opacity = "1";
        heading.innerText = "We have launched!";
        heading.style.opacity = "1";
      }, 2000);
    }
  }, 1000);
}

function update(timeSkipped = false) {
  if (timeUnits[0] === 0 && timeUnits[1] === 0 && timeUnits[2] === 0 && timeUnits[3] === 1) {
    fini();
  }
  if (timeSkipped) {
    let i = 0;
    for (let card in cards) {
      flipCard(cards[card], timeUnits[i++]);
    }
  } else {
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
}

let flipInterval = setInterval(update, 1000);

// 1) pause/resume the countdown timer
// 2) see what happens at the end of the countdown!
let paused = false, enterTimeout = -1;
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    clearTimeout(enterTimeout);
    clearInterval(flipInterval);
  }

  if (e.key === " " && !finished) {
    if (paused) {
      flipInterval = setInterval(update, 1000);
    }
    paused = !paused;
  } else if (e.key === "Enter") {
    enterTimeout = setTimeout(() => {
      timeUnits = [0, 0, 0, 4];
      update(true);
      heading.style.transition = "opacity 500ms";
      heading.style.opacity = "0";
      setTimeout(() => {
        heading.style.opacity = "1";
        heading.innerText = "We're launching soon";
      }, 500);
      flipInterval = setInterval(update, 1000);
    }, finished ? 4000 : 1000);
    paused = finished = false;
  }
});

// social media links will trigger page refresh
let socialMediaLinks = document.querySelectorAll(".social-media a");
for (let i = 0, len = socialMediaLinks.length; i < len; i++) {
  socialMediaLinks[i].addEventListener("click", () => {
    location.reload();
  });
}

// AUDIO AUTOPLAY IS NOT ALLOWED (FOR SOME REASON) !
// let promise = document.getElementById("ticking").play();
// if (promise !== undefined) {
//   promise.then(() => {
//     console.log("autoplay started!");
//   }).catch(error => {
//     console.log("autoplay was prevented!");
//   });
// }
