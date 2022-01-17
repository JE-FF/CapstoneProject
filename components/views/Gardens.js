const kelvinToFahrenheit = (kelvinTemp) =>
  Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

import html from "html-literal";

export default (st) => html`
  <!-- <h3>
    Temperature in ${st.weather.city} is
    ${kelvinToFahrenheit(st.weather.temp)}F. It feels like
    ${kelvinToFahrenheit(st.weather.feelsLike)}F.
  </h3> -->

  <div id="gardenViewContainer">
    <ul id="gardenList">
      ${st.gardens
        .map((garden) => {
          return `<li><b>${garden.nameOfGarden}</b><br>${garden.location.address},<br>${garden.location.city}<br>Hours Today: ${garden.open} - ${garden.close}</li>`;
        })
        .join("")}
    </ul>

    <div id="map"></div>
  </div>
`;
