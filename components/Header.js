import html from "html-literal";
import Nav from "./Nav";
import logo from "/assets/img/soildarityLogo.png"
import spade from "/assets/img/spade.svg";
import hoe from "/assets/img/hoe.svg";

export default (st) => html`
  <header>
        <img id="logo" width="100px" height="auto" src="${logo}" />
        
        <!-- header title with inline spade and shovel images -->
        <h1 class="headerTitle">
            <img style="transform: rotate(45deg);" width="auto" height="50px" src="${spade}"/>
            Grown @ Home${st.header}
            <img style="transform: rotate(-45deg);" width="auto" height="50px" src="${hoe}"/>
        </h1>

        ${Nav(st)}

    </header>
`;
