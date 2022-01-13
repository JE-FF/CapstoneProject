import html from "html-literal";
import GARDENS_API_URL from "/.env";

export default () => html`
  <p>
    Fill out the form below to register your garden with Grown @ Home.
  </p>

  <form
    id="gardenRegistrationForm"
    name="garden-registration-form"
    accept-charset="utf-8"
    action="${GARDENS_API_URL}"
    method="post"
  >
    <fieldset id="garden-Registration-inputs">
      <label for="nameOfGarden">Garden Name:</label>
      <input
        type="text"
        name="nameOfGarden"
        id="nameOfGarden"
        placeholder="Jeff's Home Garden"
        required="true"
      />

      <label for="open">Open:</label>
      <input type="time" name="open" id="open" value="10:00" required="true" />

      <label for="close">Close:</label>
      <input
        type="time"
        name="close"
        id="close"
        required="true"
      />

      <label for="address">Address:</label>
      <input
        type="text"
        name="address"
        id="address"
        placeholder="1234 Main Street"
        required="true"
      />

      <label for="city">City:</label>
      <input
        type="text"
        name="city"
        id="city"
        placeholder="Kansas City"
        required="true"
      />
      <label for="lat">Latitude:</label>
      <input
        type="text"
        name="lat"
        id="lat"
        placeholder="00.00000"
        required="true"
      />
      <label for="lon">Longitude:</label>
      <input
        type="text"
        name="lon"
        id="lon"
        placeholder="000.00000"
        required="true"
      />

      <input type="hidden" name="productsAvailable" id="productsAvailable" />
    </fieldset>
    <input type="submit" value="Submit" />
  </form>
`;
