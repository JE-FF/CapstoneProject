const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  contact: {
    accountId: String,
  },
  location: {
    lat: Number,
    lon: Number,
    city: String
  },
  productsAvailable: [String]
});

const Garden = mongoose.model("Garden", gardenSchema);

module.exports = {
  schema: gardenSchema,
  model: Garden
};
