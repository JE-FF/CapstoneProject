const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  nameOfGarden: { type: String, required: true },
  productsAvailable: [String],
  open: { type: String, required: true },
  close: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
});

const Garden = mongoose.model("Garden", gardenSchema);

module.exports = {
  schema: gardenSchema,
  model: Garden,
};
