import html from "html-literal";
import * as views from "./views";

export default (st) => html`
  <main>
    <div class="gardenList">
      <p>LIST OF GARDENS GOES HERE.</p>
    </div>

    <div class="centerContainer">
      ${views[st.view](st)}
    </div>

    <div class="events">
      <p>LIST OF UPCOMING EVENTS</p>
    </div>
  </main>
`;
