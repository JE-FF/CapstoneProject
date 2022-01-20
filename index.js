import { Header, Nav, Main, Footer } from "/components";
import * as state from "/store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import dotenv from "dotenv";
import gardenMarker from "/assets/img/plot-icon.svg";

dotenv.config();

const router = new Navigo(window.location.origin);

function render(st) {
  document.querySelector("#root").innerHTML = `
    ${Header()}
    ${Nav(state.Links)}
    ${Main(st)}
    ${Footer()}
  `;
  router.updatePageLinks();
  addEventListeners(st);
}

function addEventListeners(st) {
  document.querySelectorAll("nav a").forEach((navLink) =>
    navLink.addEventListener("click", (event) => {
      event.preventDefault();
      render(state[event.target.title]);
    })
  );

  // prevent default html form action, structure form input, POST structured input to gardens api.
  if (st.view === "Register") {
    document.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();

      const inputList = event.target.elements;
      console.log("Input Element List", inputList);

      const requestData = {
        nameOfGarden: inputList.nameOfGarden.value,
        productsAvailable: null,
        open: inputList.open.value,
        close: inputList.close.value,
        location: {
          lat: inputList.lat.value,
          lon: inputList.lon.value,
          city: inputList.city.value,
          address: inputList.address.value,
        },
      };
      console.log("request Body", requestData);

      axios
        .post(`${process.env.GARDENS_API_URL}`, requestData)
        .then((response) => {
          // Push new garden onto Gardens state gardens array so it is displayed in the garden list
          state.Gardens.gardens.push(response.data);
          router.navigate("/Gardens");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  // Add menu toggle to bars icon in nav bar
  document
    .querySelector(".fa-bars")
    .addEventListener("click", () =>
      document.querySelector("nav > ul").classList.toggle("hidden")
    );

    // if desktop view, then do not hide nav under hamburger menu
    if (document.querySelector(":root").clientWidth > 815) {
      document.querySelector("nav > ul").classList.remove("hidden");
      document.querySelector(".fa-bars").classList.add("hidden");
    }

  // Functionality for home menu & background
  // This was one of those rewarding moments that makes all the head-scratching worth it.
  if (st.view === "Home") {
    // Clickable logo and text
    const eatOption = document.querySelector(".eatOption");
    const growOption = document.querySelector(".growOption");
    const learnOption = document.querySelector(".learnOption");

    // Selection indicator bars
    const eatSelected = document.querySelector(".eatSelected");
    const growSelected = document.querySelector(".growSelected");
    const learnSelected = document.querySelector(".learnSelected");

    // Menu content
    const eatPane = document.querySelector(".eatPane");
    const growPane = document.querySelector(".growPane");
    const learnPane = document.querySelector(".learnPane");

    // Background
    const eatBackground = document.querySelector(".eatBackground");
    const growBackground = document.querySelector(".growBackground");
    const learnBackground = document.querySelector(".learnBackground");

    eatOption.addEventListener("click", () => {
      eatSelected.classList.remove("hidden");
      growSelected.classList.add("hidden");
      learnSelected.classList.add("hidden");

      eatPane.classList.remove("hidden");
      growPane.classList.add("hidden");
      learnPane.classList.add("hidden");

      eatBackground.classList.remove("hidden");
      growBackground.classList.add("hidden");
      learnBackground.classList.add("hidden");
    });

    growOption.addEventListener("click", () => {
      growSelected.classList.remove("hidden");
      eatSelected.classList.add("hidden");
      learnSelected.classList.add("hidden");

      growPane.classList.remove("hidden");
      eatPane.classList.add("hidden");
      learnPane.classList.add("hidden");

      eatBackground.classList.add("hidden");
      growBackground.classList.remove("hidden");
      learnBackground.classList.add("hidden");
    });

    learnOption.addEventListener("click", () => {
      learnSelected.classList.remove("hidden");
      growSelected.classList.add("hidden");
      eatSelected.classList.add("hidden");

      learnPane.classList.remove("hidden");
      growPane.classList.add("hidden");
      eatPane.classList.add("hidden");

      eatBackground.classList.add("hidden");
      growBackground.classList.add("hidden");
      learnBackground.classList.remove("hidden");
    });
  }

  // Leaflet map functionality
  if (st.view === "Gardens") {
    const map = L.map("map").setView([39.07193, -94.38628], 13);
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);

    let gardenIcon = L.icon({
      iconUrl: gardenMarker,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    st.gardens.forEach((garden) => {
      return L.marker([garden.location.lat, garden.location.lon], {
        icon: gardenIcon,
      }).addTo(map);
    });
  }
}

router.hooks({
  before: (done, params) => {
    const page =
      params && params.hasOwnProperty("page")
        ? capitalize(params.page)
        : "Gardens";

    if (page === "Gardens") {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st.%20louis`
        )
        .then((response) => {
          state.Gardens.weather = {};
          state.Gardens.weather.city = response.data.name;
          state.Gardens.weather.temp = response.data.main.temp;
          state.Gardens.weather.feelsLike = response.data.main.feels_like;
          state.Gardens.weather.description = response.data.weather[0].main;
          done();
        })
        .catch((err) => console.log(err));
    }

    if (page === "Gardens") {
      axios
        .get(`${process.env.GARDENS_API_URL}`)
        .then((response) => {
          state.Gardens.gardens = response.data;
          done();
        })
        .catch((err) => console.log(err));
    }
  },
});

router
  .on({
    "/": () => render(state.Home),
    ":view": (params) => render(state[capitalize(params.view)]),
  })
  .resolve();
