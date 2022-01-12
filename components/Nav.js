import html from "html-literal";

export default (links) => html`
  <nav>
    <ul class="hidden nav-links">
      ${links.map(
        (link) =>
          `<li><a href="/${link.title}" title="${link.title}" data-navigo>${link.text}</a></li>`
      )}
    </ul>
  </nav>
`;
