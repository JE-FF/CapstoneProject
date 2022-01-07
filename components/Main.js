import html from "html-literal";
import * as views from "./views";

export default (st) => html`
  <main>

    <div class="centerContainer">
      ${views[st.view](st)}
    </div>

  </main>
`;
