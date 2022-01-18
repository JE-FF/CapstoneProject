import html from "html-literal";

export default () => html`
  <div class="pageDescription">
    <h1>Contact Us</h1>
    <p>
      Have a question, want to get involved, or simply want to know more?<br />Send
      us a message and we'll respond as soon as possible!
    </p>
    <br />
  </div>

  <form
    id="fs-frm"
    name="simple-contact-form"
    accept-charset="utf-8"
    action="https://formspree.io/f/xqknkrqw"
    method="post"
  >
    <fieldset id="fs-frm-inputs">
      <label for="full-name">Full Name *</label><br />
      <input
        type="text"
        name="name"
        id="full-name"
        placeholder="First and Last"
        required=""
      /><br /><br />

      <label for="email-address">Email Address *</label><br />
      <input
        type="email"
        name="_replyto"
        id="email-address"
        placeholder="Email@domain.tld"
        required=""
      /><br /><br />

      <label for="message">Message *</label><br />
      <textarea
        rows="5"
        name="message"
        id="message"
        placeholder="Message"
        required=""
      ></textarea>

      <input
        type="hidden"
        name="_subject"
        id="email-subject"
        value="Contact Form Submission"
      />
    </fieldset>
    <br />
    <input type="submit" value="Submit" />
  </form>
`;
