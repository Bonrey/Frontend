// ===============================
// initialization of the variables
// ===============================
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
let visibleItemElements = {};
for (let key in items) {
  itemElements[key] = document.getElementById(key);
  visibleItemElements[key] = true;
}
let filters = [];

const addFilterAudio = new Audio("media/click.mp3");
const removeFilterAudio = new Audio("media/whoosh.mp3");


// ===================
// update upper margin
// ===================
let filtersMenuShown = false;

function updateTopMargin() {
  if (!filtersMenuShown) {  // filters menu hidden
    if (window.outerWidth <= 800) {
      itemsWrapper.style.marginTop = "80px";  // 60 + 20
    } else {
      itemsWrapper.style.marginTop = "60px";
    }
  } else {  // filters menu shown
    if (window.outerWidth <= 800) {
      itemsWrapper.style.marginTop = "34px";  // 80 - 46
    } else if (window.outerWidth <= 1000) {
      itemsWrapper.style.marginTop = "14px";  // 60 - 46
    } else {
      itemsWrapper.style.marginTop = "2px";  // 60 - 58 (see _components.scss for more details)
    }
  }
}

updateTopMargin();
window.addEventListener("resize", updateTopMargin);


// ======================
// hide/show filters menu
// ======================
function hideFiltersMenu() {
  filtersMenu.style.animation = "invisible-menu-item 0.3s 1";
  setTimeout(() => {
    filtersMenu.style.display = "none";
    updateTopMargin();
  }, 270);
  filtersMenuShown = false;
}

function showFiltersMenu() {
  filtersMenu.style.display = "flex";
  filtersMenu.style.animation = "visible-menu-item 0.3s 1";
  setTimeout(() => {
    filtersMenu.style.opacity = "1";
  }, 270);
  filtersMenuShown = true;
  updateTopMargin();
}


// =============================
// remove button for each filter
// =============================
const removeFilterButtons = document.querySelectorAll(".filters-menu__filters button");
for (let i = 0, len = removeFilterButtons.length; i < len; i++) {
  removeFilterButtons[i].addEventListener("click", () => {
    removeFilterAudio.play();

    let filterElement = removeFilterButtons[i].parentElement;
    filterElement.style.animation = "invisible-filter 0.3s 1";
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
  removeFilterAudio.play();

  for (let i = 0, len = filters.length; i < len; i++) {
    let filterElement = document.getElementById(filters[i]);
    filterElement.style.animation = "invisible-menu-item 0.3s 1";
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
    addFilterAudio.play();
    if (!filtersMenuShown) showFiltersMenu();

    let filterElement = document.getElementById(filterTablets[i].innerText.toLowerCase());
    if (filters.indexOf(filterElement.id) === -1) {
      filterElement.style.display = "flex";
      filterElement.style.animation = "visible-filter 0.3s 1";
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
        break;
      }
    }

    if (show && !visibleItemElements[item]) {
      itemElements[item].style.display = "flex";
      itemElements[item].style.animation = "visible-menu-item 0.3s 1";
      visibleItemElements[item] = true;
    } else if (!show && visibleItemElements[item]) {
      itemElements[item].style.animation = "invisible-menu-item 0.3s 1";
      setTimeout(() => {
        itemElements[item].style.display = "none";
      }, 270);
      visibleItemElements[item] = false;
    }
  }
}