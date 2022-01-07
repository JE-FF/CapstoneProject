export default st => `
<table id="gardens">
<tr><th>Garden Name</th><th>City</th></tr>
${st.gardens
  .map(garden => {
    return `<tr><td>${garden.nameOfGarden}</td><td>${garden.location.city}</td></tr>`;
  })
  .join("")}
</table>
`;
