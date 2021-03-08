const filtersMenu = document.getElementsByClassName("filters-menu")[0];
const itemsWrapper = document.getElementsByClassName("items-wrapper")[0];

const items = {
  "photosnap-item": ["frontend", "senior", "html", "css", "javascript"],
  "manage-item": ["fullstack", "midweight", "python", "react"],
  "account-item": ["frontend", "junior", "javascript", "react", "sass"],
  "myhome-item": ["frontend", "junior", "css", "javascript"],
  "loop-studios-item": ["fullstack", "midweight", "javascript", "ruby", "sass"],
  "faceit-item": ["backend", "junior", "ruby", "ror"],
  "shortly-item": ["frontend", "junior", "html", "javascript", "sass"],
  "insure-item": ["frontend", "junior", "javascript", "vue", "sass"],
  "eyecam-item": ["fullstack", "midweight", "javascript", "python", "django"],
  "air-filter-item": ["frontend", "junior", "javascript", "react", "sass"]
};

let itemElements = {};
for (let key in items) {
  itemElements[key] = document.getElementById(key);
}
let filters = [];


// ===================
// update upper margin
// ===================
let filtersMenuShown = false;
const updateTopMargin = () => itemsWrapper.style.marginTop = filtersMenuShown ? "21px" : "50px";


// ======================
// hide/show filters menu
// ======================
function hideFiltersMenu() {
  filtersMenu.style.animation = "invisible 0.3s 1";
  setTimeout(() => {
    filtersMenu.style.display = "none";
    updateTopMargin();
  }, 270);
  filtersMenuShown = false;
}

function showFiltersMenu() {
  filtersMenu.style.display = "flex";
  filtersMenu.style.animation = "visible 0.3s 1";
  setTimeout(() => {
    filtersMenu.style.opacity = "1";
  }, 270);
  filtersMenuShown = true;
  updateTopMargin();
}


// ==============================
// remove buttons for each filter
// ==============================
const removeFilterButtons = document.querySelectorAll(".filters-menu__filters button");
for (let i = 0, len = removeFilterButtons.length; i < len; i++) {
  removeFilterButtons[i].addEventListener("click", () => {
    let filterElement = removeFilterButtons[i].parentElement;
    filterElement.style.animation = "invisible 0.3s 1";
    setTimeout(() => {
      filterElement.style.display = "none";
    }, 270);

    filters.splice(filters.indexOf(filterElement.id), 1);
    updateItems();
    if (filters.length === 0) {
      hideFiltersMenu();
    }
  });
}


// ================
// clear-all button
// ================
const clearBtn = document.getElementById("clear");
clearBtn.addEventListener("click", () => {
  for (let i = 0, len = filters.length; i < len; i++) {
    let filterElement = document.getElementById(filters[i]);
    filterElement.style.animation = "invisible 0.3s 1";
    setTimeout(() => {
      filterElement.style.display = "none";
    }, 270);
  }
  filters = [];
  updateItems();
  hideFiltersMenu();
});


// ===============
// setting filters
// ===============
const filterTablets = document.querySelectorAll(".item .filters button");
for (let i = 0, len = filterTablets.length; i < len; i++) {
  filterTablets[i].addEventListener("click", () => {
    if (!filtersMenuShown) showFiltersMenu();

    let filterElement = document.getElementById(filterTablets[i].innerText.toLowerCase());
    if (filters.indexOf(filterElement.id) === -1) {
      filterElement.style.display = "flex";
      filterElement.style.animation = "visible 0.3s 1";
      filters.push(filterElement.id);
      updateItems();
    }
  });
}


// ==================================
// leaving only the appropriate items
// ==================================
function updateItems() {
  for (let item in items) {
    let show = true;
    for (let i = 0, len = filters.length; i < len; i++) {
      if (items[item].indexOf(filters[i]) === -1) {
        show = false;
        break
      }
    }
    itemElements[item].style.display = show ? "flex" : "none";
    itemElements
  }
}