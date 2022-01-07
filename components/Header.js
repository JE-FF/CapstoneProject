import html from "html-literal";
import logo from "/assets/img/g@hLogo.png";
import homeButton from "/assets/img/home_black_24dp.svg";

export default () => html`
  <header>
    <img id="homeButton" width="40px" height="auto" src="${homeButton}" />

    <img id="logo" width="100px" height="auto" src="${logo}" />

    <div id="hideMe" width="100px"></div>
  </header>
`;
