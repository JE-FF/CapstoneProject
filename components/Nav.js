import html from "html-literal";
import Links from "/store/Links";

export default () => html`
    <nav>
        <!-- <a href="./index.html">Home</a>
        <a href="./about.html">About</a>
        <a href="./contact.html">Contact</a>
        <a href="./events.html">Events</a> -->
        ${Links.map((i) => `<a href="/${i.title}"><li>${i.text}</li></a>`)}
    </nav>
`;

