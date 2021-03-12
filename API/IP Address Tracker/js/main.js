const apiKey = "at_yD616QsY5LwKtmSTbfr3fiwpFDfDI"; //"at_EydNviLJCZNMWuRaWCSJtngeQFCUJ";

const textField = document.querySelector("input[type='text']");
textField.readOnly = true;

const dataElements = {
  "ip": document.querySelector("#ip-address p"),
  "location": document.querySelector("#location p"),
  "timezone": document.querySelector("#timezone p"),
  "isp": document.querySelector("#isp p")
}

const loaders = {
  "ip-loader": document.querySelector("#ip-address div"),
  "location-loader": document.querySelector("#location div"),
  "timezone-loader": document.querySelector("#timezone div"),
  "isp-loader": document.querySelector("#isp div")
}

const headingsText = ["ip address", "location", "timezone", "isp"];
const infoHeadings = document.querySelectorAll(".information h2");
const verticalLines = document.getElementsByClassName("vertical-line");
const errorH2 = document.querySelector(".error-div h2");
const errorParagraph = document.querySelector(".error-div p");

const errorH2Text = "Something went wrong";
const errorParagraphHTML = "Make sure that you typed in the correct IP or domain name and try again.<br>" +
  "Also, check if your browser allows sending requests.";


// =================================================================
// 1) update location and ISP font size depending on the text length
// =================================================================
// 2) change the placeholder if the screen is too narrow
// =================================================================
function updateFontSize() {
  let infoTexts = [dataElements.location, dataElements.isp];
  for (let i = 0; i < 2; i++) {
    if (infoTexts[i].innerText.length > 36 && window.outerWidth <= 1200) {
      infoTexts[i].style.fontSize = "0.8rem";
      infoTexts[i].style.lineHeight = "1rem";
    } else if (infoTexts[i].innerText.length > 36) {
      infoTexts[i].style.fontSize = "1.1rem";
    }
  }
}

function updatePlaceholder() {
  if (!textField.classList.contains("red-placeholder") && window.outerWidth < 360) {
    textField.placeholder = "Search for any IP or domain";
  } else if (!textField.classList.contains("red-placeholder")) {
    textField.placeholder = "Search for any IP address or domain";
  } else {
    textField.placeholder = "Input field must not be empty";
  }
}

window.addEventListener("resize", updateFontSize);
window.addEventListener("resize", updatePlaceholder);
updatePlaceholder();


// ============
// create a map
// ============
const map = L.map("map", {zoomControl: false});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  maxZoom: 20
}).addTo(map);


// =======================
// handle inaccurate input
// =======================
function emptyInputError() {
  textField.placeholder = "Input field must not be empty";
  textField.classList.add("red-placeholder");
}

function badUrlError() {
  for (let i = 0; i < 4; i++) {
    infoHeadings[i].innerText = "";
  }
  for (let i = 0; i < 3; i++) {
    verticalLines[i].style.width = "0";
  }
  for (let dataElement in dataElements) {
    dataElements[dataElement].innerText = "";
  }
  for (let loader in loaders) {
    loaders[loader].style.display = "none";
  }
  errorH2.innerText = errorH2Text;
  errorParagraph.innerHTML = errorParagraphHTML;
}


// ===================
// update data and map
// ===================
function updateInfoSection(data) {
  for (let loader in loaders) {
    loaders[loader].style.display = "none";
  }
  dataElements.ip.innerText = data.ip;
  dataElements.location.innerText = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;
  dataElements.timezone.innerText = "UTC " + data.location.timezone;
  dataElements.isp.innerText = data.isp;
  updateFontSize();
}

function updateMap(data) {
  const {lat, lng} = data.location;
  map.setView([lat, lng], 12);
  L.marker([lat, lng], {
    icon: L.icon({
      iconUrl: "images/icon-location.svg",
      iconSize: [46, 56],
      iconAnchor: [23, 56]
    })
  }).addTo(map);
}


// ===============================
// get information by ip or domain
// ===============================
function getGeoInfo(firstLaunch, ipInput = "", domainInput = "") {
  fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
      if (firstLaunch) {
        loaders["ip-loader"].style.display = "none";
        dataElements.ip.innerText = data.ip;
        return ["ipAddress", data.ip];
      }
      return ipInput ? ["ipAddress", ipInput] : ["domain", domainInput];
    })
    .then(data => fetch(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&${data[0]}=${data[1]}`))
    .then(response => {
      textField.readOnly = false;
      if (response.ok) {
        return response.json();
      }
      throw "bad url error";
    })
    .then(data => {
        updateInfoSection(data);
        updateMap(data);
      }
    ).catch(_ => badUrlError());
}

// first launch
getGeoInfo(true);


// ============================
// get data from the text field
// ============================
function isValidIp(ip) {
  const ipNum = "([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
  const reg = new RegExp(`^${ipNum}\\.${ipNum}\\.${ipNum}\\.${ipNum}$`);
  return reg.test(ip);
}


// ==========================
// handle search button click
// ==========================
function updateGeoInfo() {
  const input = textField.value;
  if (input === null || input === "") {
    emptyInputError();
    return;
  }

  textField.value = "";
  textField.readOnly = true;
  for (let i = 0; i < 4; i++) {
    infoHeadings[i].innerText = headingsText[i];
  }
  for (let i = 0; i < 3; i++) {
    verticalLines[i].style.width = "1px";
  }
  for (let dataElement in dataElements) {
    dataElements[dataElement].innerText = "";
  }
  for (let loader in loaders) {
    loaders[loader].style.display = "block";
  }
  errorH2.innerText = errorParagraph.innerHTML = "";

  if (isValidIp(input)) {
    loaders["ip-loader"].style.display = "none";
    dataElements.ip.innerText = input;
    getGeoInfo(false, input);
  } else {
    getGeoInfo(false, "", input);
  }
}

const searchButton = document.querySelector("button[type='submit']");
searchButton.addEventListener("click", updateGeoInfo);


// ======================================================================
// set text field to the default state after clicking outside or on focus
// ======================================================================
const form = document.getElementsByTagName("form")[0];
document.addEventListener("click", e => {
  if (!form.contains(e.target) && textField.classList.contains("red-placeholder")) {
    textField.classList.remove("red-placeholder");
    updatePlaceholder();
  }
});

textField.addEventListener("focus", function () {
  if (this.classList.contains("red-placeholder")) {
    this.classList.remove("red-placeholder");
    updatePlaceholder();
  }
});


// ===========
// attribution
// ===========
const attribution = document.getElementsByClassName("attribution")[0];
const attrBtn = document.getElementById("attribution-btn");
let attrShown = false;

function onAttrBtnClick() {
  if (getComputedStyle(attribution).display === "none") {
    attrShown = true;
    attrBtn.style.opacity = "1";
    attribution.style.display = "flex";
    attribution.style.animation = "show-attribution 1s 1";
  } else {
    attrShown = false;
    attrBtn.style.opacity = "0.5";
    onMouseOver();
    attribution.style.animation = "hide-attribution 1s 1";
    setTimeout(() => attribution.style.display = "none", 1000);
  }
}

attrBtn.addEventListener("click", onAttrBtnClick);

const onMouseOver = _ => attrBtn.style.opacity = "1";
attrBtn.addEventListener("mouseover", onMouseOver);
attrBtn.addEventListener("mouseout", _ => attrBtn.style.opacity = attrShown ? "1" : "0.5");