const mongoose = require("mongoose");

const gardenSchema = new mongoose.Schema({
  nameOfGarden: { type: String, required: true },
  productsAvailable: [String],
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    city: { type: String, required: true },
  },
});

const Garden = mongoose.model("Garden", gardenSchema);

module.exports = {
  schema: gardenSchema,
  model: Garden,
};
