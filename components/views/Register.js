import html from "html-literal";

export default () => html`

<div class="pageDescription">
    <h1>Register Your Garden</h1>
    <p>
      Fill out the form completely to register your garden.<br>
      If you require any assistance, please don't hesitate to <a href="/Contact" data-navigo>contact us!</a>
    </p>
    <br />
  </div><br>

  <form
    id="gardenRegistrationForm"
    name="garden-registration-form"
    accept-charset="utf-8"
    action=""
    method="POST"
  >
    <fieldset id="garden-Registration-inputs">
      <label for="nameOfGarden">Garden Name:</label>
      <input
        type="text"
        name="nameOfGarden"
        id="nameOfGarden"
        placeholder="Jeff's Home Garden"
        required="true"
      /><br><br>

      <label for="open">Open:</label><br>
      <input type="time" name="open" id="open" value="10:00" required="true" />
       to
      <input type="time" name="close" id="close" required="true" /><br><br>

      <label for="address">Address:</label>
      <input
        type="text"
        name="address"
        id="address"
        placeholder="1234 Main Street"
        required="true"
      /><br><br>
      
      <label for="city">City:</label>
      <input
        type="text"
        name="city"
        id="city"
        placeholder="Kansas City"
        required="true"
      /><br><br>
      <label for="lat">Latitude:</label>
      <input
        type="text"
        name="lat"
        id="lat"
        placeholder="00.00000"
        required="true"
      /><br><br>
      <label for="lon">Longitude:</label>
      <input
        type="text"
        name="lon"
        id="lon"
        placeholder="000.00000"
        required="true"
      /><br><br>

      <input type="hidden" name="productsAvailable" id="productsAvailable" />
    </fieldset><br>
    <input type="submit" value="Submit" />
  </form>
`;
