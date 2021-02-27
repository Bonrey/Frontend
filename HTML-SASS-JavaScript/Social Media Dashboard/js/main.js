const body = document.getElementsByTagName("body")[0];
const toggle = document.getElementById("toggle");
const divider = document.getElementById("header-divider");

// add focus to cards and toggle switch
const focusableElements = document.querySelectorAll("#toggle, .top-card, .overview-section__card");
for (let i = 0, len = focusableElements.length; i < len; i++) {
  focusableElements[i].setAttribute("tabindex", "0");
}

// toggle theme + cards transition animation
const cards = document.querySelectorAll(".top-card section, .overview-section__card");
toggle.addEventListener("change", () => {
  const len = cards.length;
  if (toggle.checked) {
    body.className = "dark-theme";
    for (let i = 0; i < len; i++) {
      cards[i].style.transition = (400 + (3 - i % 4) * 200).toString() + "ms";
    }
  } else {
    body.className = "light-theme";
    for (let i = 0; i < len; i++) {
      cards[i].style.transition = (400 + (i % 4) * 200).toString() + "ms";
    }
  }
  window.setTimeout(() => {
    for (let i = 0, len = cards.length; i < len; i++) {
      cards[i].style.transition = "0.3s";
    }
  }, 1000);
});

// show a horizontal line on smaller screens
const onResize = () => divider.style.display = window.outerWidth > 640 ? "none" : "block";
window.addEventListener("resize", onResize);
onResize();