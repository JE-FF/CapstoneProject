import html from "html-literal";
import logo from "/assets/img/g@hLogo.png";

export default () => html`
  <header>
    <a href="/"><img id="logo" src="${logo}" alt="site logo, and link to homepage"/></a>

    <i class="fas fa-bars" aria-hidden="true"></i>

    <!-- <div id="hideMe"></div> -->
  </header>
`;
