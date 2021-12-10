import html from "html-literal";

export default () => html`
  <form action="" method="POST">
    <label for="name">Name:</label>
    <input type="text" name="name" id="name" placeholder="Full Name" /><br />

    <label for="email">Email:</label>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="example@gmail.com"
    /><br />
    <div>
      <label for="msg"></label>
      <textarea
        name="msg"
        id="msg"
        placeholder="Please, enter your message here."
        cols="50"
        rows="10"
      ></textarea>
    </div>

    <input type="submit" value="Submit" />
  </form>
`;
