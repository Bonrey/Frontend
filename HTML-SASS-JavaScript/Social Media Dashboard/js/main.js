const body = document.getElementsByTagName("body")[0];
const toggle = document.getElementById("toggle");
const divider = document.getElementById("header-divider");

// add focus to cards and toggle switch
const focusableElements = document.querySelectorAll("#toggle, .top-card, .overview-section__card");
for (let i = 0, len = focusableElements.length; i < len; i++) {
  focusableElements[i].setAttribute("tabindex", "0");
}

// toggle theme
toggle.addEventListener("change", () => body.className = toggle.checked ? "dark-theme" : "light-theme");

// show a horizontal line on smaller screens
const onResize = () => divider.style.display = window.outerWidth > 640 ? "none" : "block";
window.addEventListener("resize", onResize);
onResize();