const apiKey = "at_EydNviLJCZNMWuRaWCSJtngeQFCUJ";
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
let customMarker = L.icon({
  iconUrl: "images/icon-location.svg"
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  maxZoom: 20
}).addTo(map);


// ===================
// update data and map
// ===================
function getGeoInfo(firstLaunch = false, ipInput, domainInput) {
  fetch("https://api.ipify.org/?format=json")
    .then(response => response.json())
    .then(data => {
      if (firstLaunch) {
        loaders["ip-loader"].style.display = "none";
        dataElements.ip.innerText = data.ip;
      } else {
        if (ipInput) {
          dataElements.ip.innerText = ipInput;
          return ipInput;
        } else if (domainInput) {

        } else {
          console.log("Error: incorrect IP or domain!");
        }
      }
      return ["ip", dataElements.ip.innerText];
    })
    .then(data => {
      let requestUrl = "https://geo.ipify.org/api/v1?";
      fetch(`${requestUrl}apiKey=${apiKey}&ipAddress=${ip}`)
    })
    .then(response => response.json())
    .then(data => {
      loaders["location-loader"].style.display = "none";
      loaders["timezone-loader"].style.display = "none";
      loaders["isp-loader"].style.display = "none";

      dataElements.location.innerText = `${data.location.region}, ${data.location.country}`;
      dataElements.timezone.innerText = "UTC " + data.location.timezone;
      dataElements.isp.innerText = data.isp;

      const {lat, lng} = data.location;
      map.setView([lat, lng], 12);

      L.marker([lat, lng], {icon: customMarker})
        .bindPopup(`<b>${data.location.region}, ${data.location.country}</b>`)
        .addTo(map);
    });
}

// first launch
getGeoInfo(true);


// ============================
// get data from the text field
// ============================
const textField = document.querySelector("input[type='text']");

function isIpValid(ip) {
  const ipNum = "([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])";
  const reg = new RegExp(`^${ipNum}\\.${ipNum}\\.${ipNum}\\.${ipNum}$`);
  return reg.test(ip);
}

function invalidIpError() {
  console.log("invalid ip");
}

function updateGeoInfo() {
  let ip = textField.value;
  textField.value = "";

  if (!isIpValid(ip)) {
    textField.placeholder = "Enter correct IP address or domain!";
    textField.classList.add("red-placeholder");
    invalidIpError();
  } else {
    dataElements.ip.innerText = ip;
    dataElements.location.innerText = "";
    dataElements.timezone.innerText = "";
    dataElements.isp.innerText = "";

    loaders["location-loader"].style.display = "block";
    loaders["timezone-loader"].style.display = "block";
    loaders["isp-loader"].style.display = "block";

    getGeoInfo(ip);
  }
}

const searchButton = document.querySelector("button[type='submit']");
searchButton.addEventListener("click", updateGeoInfo);


const form = document.getElementsByTagName("form")[0];
document.addEventListener("click", e => {
  if (!form.contains(e.target) && textField.classList.contains("red-placeholder")) {
    textField.placeholder = "Search for any IP address or domain";
    textField.classList.remove("red-placeholder");
  }
});