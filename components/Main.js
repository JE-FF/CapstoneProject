import html from "html-literal";
import * as views from "./views";

export default (st) => html`
  <main>
    ${views[st.view](st)}
  </main>
`;
