import html from "html-literal";
import logo from "/assets/img/g@hLogo.png";

export default (links) => html`
  <header>
    <a href="/" data-navigo
      ><img id="logo" src="${logo}" alt="site logo, and link to homepage"
    /></a>

    <i class="fas fa-bars" aria-hidden="true"></i>
  </header>
`;
