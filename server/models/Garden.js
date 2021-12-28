const mongoose = require("mongoose");

// TODO rebuild schema to include location, owner, produce, etc.
const gardenSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true
  },
  crust: String,
  cheese: String,
  sauce: String,
  toppings: [String]
});

const Garden = mongoose.model("Garden", gardenSchema);

module.exports = {
  schema: gardenSchema,
  model: Garden
};
