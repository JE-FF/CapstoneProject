import html from "html-literal";
import eatBackground from "/assets/img/farhad-ibrahimzade-qgGc_1a6xGc-unsplash.jpg";
import growBackground from "/assets/img/jed-owen-1JgUGDdcWnM-unsplash.jpg";
import learnBackground from "/assets/img/nordwood-themes-nqPe1juwcdQ-unsplash.jpg";
import gardenLogo from "/assets/img/plot-icon.svg";
import eatLogo from "/assets/img/restaurant_black_24dp.svg";
import learnLogo from "/assets/img/local_library_black_24dp.svg";
import arrow from "/assets/img/arrow.svg";

export default (st) => html`
  <div class="homeMenuContainer">
    <div class="homeMenuOptions">
      <a class="eatOption" aria-selected="false">
        <br /><img src="${eatLogo}"/><br />Eat<br /><br />
        <div class="eatSelected selectionBar"></div
      ></a>
      <a class="growOption"
        ><br /><img src="${gardenLogo}"/><br />Grow<br /><br />
        <div class="growSelected selectionBar hidden"></div
      ></a>
      <a class="learnOption"
        ><br /><img src="${learnLogo}"/><br />Learn<br /><br />
        <div class="learnSelected selectionBar hidden"></div
      ></a>
    </div>

    <br />

    <div class="menuPane eatPane">
      <h1>The best meals are homemade;<br />the best food is homegrown.</h1>
      <br />
      <p>Discover what's growing in your neighborhood!</p>
      <br />
      <div class="homeMenuLink">
        <a href="/Gardens" data-navigo><h2>Find gardens near you</h2></a>
      </div>
    </div>
    <div class="menuPane growPane hidden">
      <h1>Green thumbs earn green.</h1>
      <br />
      <p>Sell the fruits of your garden to neighbors in your community.</p>
      <br />
      <div class="homeMenuLink">
        <a href="/Register" data-navigo><h2>Register your garden</h2></a>
      </div>
    </div>
    <div class="menuPane learnPane hidden">
      <h1>Find out more.</h1>
      <br />
      <p>
        Grown @ Home is a platform for gardeners to sell their home-grown produce
        and for consumers to purchase fresh vegetables from their neighbors.
      </p>
      <br />
      <div class="homeMenuLink">
        <a href="/About" data-navigo><h2>About us</h2></a>
      </div>
    </div>
  </div>
  <img class="eatBackground" src="${eatBackground}" />
  <img class="growBackground hidden" src="${growBackground}" />
  <img class="learnBackground hidden" src="${learnBackground}" />
`;
