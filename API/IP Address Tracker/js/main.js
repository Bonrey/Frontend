const apiKey = "at_yD616QsY5LwKtmSTbfr3fiwpFDfDI"; //"at_EydNviLJCZNMWuRaWCSJtngeQFCUJ";
const dataElements = {
  "ip": document.querySelector("#ip-address span"),
  "location": document.querySelector("#location span"),
  "timezone": document.querySelector("#timezone span"),
  "isp": document.querySelector("#isp span")
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


// ================================================================
// update location and isp's font size depending on the text length
// ================================================================
function updateFontSize() {
  let infoTexts = [dataElements.location, dataElements.isp];
  for (let i = 0; i < 2; i++) {
    if (infoTexts[i].innerText.length > 30) {
      if (window.outerWidth <= 600) {
        infoTexts[i].style.fontSize = "0.7rem";
      } else if (window.outerWidth <= 1200) {
        infoTexts[i].style.fontSize = "0.8rem";
      } else {
        infoTexts[i].style.fontSize = "1.1rem";
      }
    }
  }
}

window.addEventListener("resize", updateFontSize);
updateFontSize();



let map = L.map("map", {zoomControl: false});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  maxZoom: 20
}).addTo(map);


// =======================
// handle inaccurate input
// =======================
function invalidInput() {
  textField.placeholder = "Enter correct IP address or domain!";
  textField.classList.add("red-placeholder");

  for (let dataElement in dataElements) {
    dataElements[dataElement].innerText = "";
  }
  for (let loader in loaders) {
    loaders[loader].style.display = "none";
  }
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
  dataElements.location.innerText = `${data.location.region}, ${data.location.country}`;
  dataElements.timezone.innerText = "UTC " + data.location.timezone;
  dataElements.isp.innerText = data.isp;
}

function updateMap(data) {
  const {lat, lng} = data.location;
  map.setView([lat, lng], 16);
  L.marker([lat, lng], {
    icon: L.icon({
      iconUrl: "images/icon-location.svg",
      iconSize: [46, 56],
      iconAnchor: [23, 56]
    })
  }).bindPopup(`<b>${data.location.region}, ${data.location.country}</b>`).addTo(map);
}

function getGeoInfo(firstLaunch, ipInput = "", domainInput = "") {
  fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
      if (firstLaunch) {
        loaders["ip-loader"].style.display = "none";
        dataElements.ip.innerText = data.ip;
        return ["ip", data.ip];
      } else {
        if (ipInput) {
          return ["ip", ipInput];
        } else if (domainInput) {
          return ["domain", domainInput];
        }
        throw "invalid input!";
      }
    })
    .then(data => {
      let requestUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}`;
      if (data[0] === "ip") {
        requestUrl += `&ipAddress=${data[1]}`;
      } else if (data[0] === "domain") {
        requestUrl += `&domain=${data[1]}`;
      }
      return fetch(requestUrl);
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw "bad url!";
    })
    .then(data => {
        updateInfoSection(data);
        updateMap(data);
      }
    )
    .catch(error => {
      if (error === "bad url!") {
        badUrlError();
      } else {
        invalidInput();
      }
    });
}

// first launch
getGeoInfo(true);


// ============================
// get data from the text field
// ============================
const textField = document.querySelector("input[type='text']");

function isValidIp(ip) {
  const ipNum = "([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])";
  const reg = new RegExp(`^${ipNum}\\.${ipNum}\\.${ipNum}\\.${ipNum}$`);
  return reg.test(ip);
}


// ==========================
// handle search button click
// ==========================
function updateGeoInfo() {
  const input = textField.value;
  textField.value = "";
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
    document.querySelector("#ip-address span").innerText = input;
    getGeoInfo(false, input);
  } else {
    getGeoInfo(false, "", input);
  }
}

const searchButton = document.querySelector("button[type='submit']");
searchButton.addEventListener("click", updateGeoInfo);


// ================================================================
// bring the text field to the default state after clicking outside
// ================================================================
const form = document.getElementsByTagName("form")[0];
document.addEventListener("click", e => {
  if (!form.contains(e.target) && textField.classList.contains("red-placeholder")) {
    textField.placeholder = "Search for any IP address or domain";
    textField.classList.remove("red-placeholder");
  }
});