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


// ===================
// update data and map
// ===================
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
        loaders["ip-loader"].style.display = "none";
        loaders["location-loader"].style.display = "none";
        loaders["timezone-loader"].style.display = "none";
        loaders["isp-loader"].style.display = "none";

        console.log("even here");
        dataElements["ip"].innerText = data.ip;
        dataElements.location.innerText = `${data.location.region}, ${data.location.country}`;
        dataElements.timezone.innerText = "UTC " + data.location.timezone;
        dataElements.isp.innerText = data.isp;

        const {lat, lng} = data.location;
        map.setView([lat, lng], 16);

        L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: "images/icon-location.svg",
            iconAnchor: [lat, lng]
          })
        }).bindPopup(`<b>${data.location.region}, ${data.location.country}</b>`).addTo(map);
      }
    )
    .catch(error => {
      console.log(error);
      invalidInput();
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

  dataElements.location.innerText = "";
  dataElements.timezone.innerText = "";
  dataElements.isp.innerText = "";

  loaders["location-loader"].style.display = "block";
  loaders["timezone-loader"].style.display = "block";
  loaders["isp-loader"].style.display = "block";

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