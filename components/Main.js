import html from "html-literal";
import * as views from "./views";

export default () => html`
  <main>
    <div class="gardenList">
      <p>LIST OF GARDENS GOES HERE.</p>
    </div>

    <!-- THIS PROBABLY WONT WORK, FIX IT. -->
    <div class="centerContainer">
      ${views.Home()}
    </div>

    <div class="events">
      <p>LIST OF UPCOMING EVENTS</p>
    </div>
  </main>
`;
