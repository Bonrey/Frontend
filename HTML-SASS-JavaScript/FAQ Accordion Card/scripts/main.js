const regularFontWeight = 400;
const boldFontWeight = 700;

function onClick(btn) {
  let fontWeight = window.getComputedStyle(btn).getPropertyValue("font-weight");
  let img = btn.children[0];

  if (fontWeight == regularFontWeight) {
    btn.style.fontWeight = boldFontWeight;
    img.style.transform = "rotate(180deg)";
    btn.nextElementSibling.style.display = "block";
  } else {
    btn.style.fontWeight = regularFontWeight;
    img.style.transform = "none";
    btn.nextElementSibling.style.display = "none";
  }
}
