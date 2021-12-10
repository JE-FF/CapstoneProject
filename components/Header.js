import html from "html-literal";

export default () => html`
  <header>
        <img id="logo" width="100px" height="auto" src="/assets/img/soildarityLogo.png" />
        
        <!-- header title with inline spade and shovel images -->
        <h1 class="headerTitle">
            <img style="transform: rotate(45deg);" width="auto" height="50px" src="assets/img/spade.svg"/>
            Soildarity
            <img style="transform: rotate(-45deg);" width="auto" height="50px" src="assets/img/hoe.svg"/>
        </h1>

        <nav>
            <a href="./index.html">Home</a>
            <a href="./about.html">About</a>
            <a href="./contact.html">Contact</a>
            <a href="./events.html">Events</a>
        </nav>
    </header>
`;
