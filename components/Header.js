import html from "html-literal";
import logo from "/assets/img/g@hLogo.png";
import homeButton from "/assets/img/home_black_24dp.svg";

export default () => html`
  <header>
    <img id="homeButton" src="${homeButton}" />

    <img id="logo" src="${logo}" />

    <div id="hideMe"></div>
  </header>
`;
