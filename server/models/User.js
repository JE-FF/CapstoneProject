const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  gardens: {
    nameOfGarden: { type: String, required: true },
    productsAvailable: [String],
    location: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
      city: { type: String, required: true },
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  schema: userSchema,
  model: User,
};
