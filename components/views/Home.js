import html from "html-literal";
import gardenBackground from "/assets/img/jed-owen-1JgUGDdcWnM-unsplash.jpg";
import gardenLogo from "/assets/img/plot-icon.svg";
import eatLogo from "/assets/img/restaurant_black_24dp.svg";
import learnLogo from "/assets/img/local_library_black_24dp.svg";

export default (st) => html`
  <div class="homeMenuContainer">
    <div class="homeMenuOptions">
      <a class="eatOption" aria-selected="false"><br><img src="${eatLogo}" /><br>Eat</a>
      <a class="growOption"><br><img src="${gardenLogo}" /><br>Grow</a>
      <a class="learnOption"><br><img src="${learnLogo}" /><br>Learn</a>
    </div>
    <div class="selectionBar eatSelected"></div>

    <br>

    <div class="eatPane">
      <h3>The best meals are homemade, the best food is homegrown.</h3>
      <p>Discover what's growing in your neighborhood!</p>
      <a href="/Gardens" data-navigo>Search gardens near you.</a>
    </div>
    <div class="growPane hidden">
      <h3>Green thumbs earn green.</h3>
      <p>Sell the fruits of your garden to neighbors in your community.</p>
      <a href="/" data-navigo>Register your garden</a>
    </div>
    <div class="learnPane hidden">
      <h3>Find out more.</h3>
      <p>about page</p>
      <a href="/About" data-navigo>About Us.</a>
    </div>
  </div>
  <img id="homeBackground" src="${gardenBackground}" />
`;
