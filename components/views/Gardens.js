import html from "html-literal";

export default st => html`
<table id="gardens">
<tr><th>Garden Name</th><th>City</th></tr>
${st.gardens
  .map(garden => {
    return `<tr><td>${garden.nameOfGarden}</td><td>${garden.location.city}</td>`;
  })
  .join("")}
</table>
`;
