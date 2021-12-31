// 'Import' the Express module instead of http
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const users = require("./routers/users");

// Initialize the Express application
const app = express();

dotenv.config();
mongoose.connect(process.env.MONGODB);
const db = mongoose.connection;

// NOTE MongoDB Atlas does not allow connections behind a public VPN.
db.on("error", console.error.bind(console, "connection error:"));
db.once(
  "open",
  console.log.bind(console, "Successfully opened connection to Mongo!")
);

const logging = (request, response, next) => {
  console.log(`${request.method} ${request.url} ${Date.now()}`);
  next();
};

app.use(express.json());
app.use(logging);
app.use("/users", users);

// Handle the request with HTTP GET method from http://localhost:4040/status
app.get("/status", (request, response) => {
  // Create the headers for response by default 200
  // Create the response body
  // End and return the response
  response.send(JSON.stringify({ message: "Service healthy" }));
});

// Tell the Express app to start listening
// Let the humans know I am running and listening on 4040
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
