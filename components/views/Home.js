import html from "html-literal";
import gardenBackground from "/assets/img/jed-owen-1JgUGDdcWnM-unsplash.jpg";

export default (st) => html`
  <img src="${gardenBackground}" />
  <div id="homeNavContainer">
    <ul>
      <li>Grow</li>
      <li>Eat</li>
      <li>Learn</li>
    </ul>
    <div id="growPane">
      GROW PANE TEXT HERE
    </div>
    <div id="eatPane">
      EAT PANE TEXT HERE
    </div>
    <div id="learnPane">
      LEARN PANE TEXT HERE
    </div>
  </div>
`;
