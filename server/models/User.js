const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    userName: {
      type: String,
      required: true
    },
    gardens: {
      nameOfGarden: String,
      productsAvailable: [String],
      location: {
        lat: Number,
        lon: Number,
        city: String,
      }
    }
  }
});

const User = mongoose.model("User", userSchema);

module.exports = {
  schema: userSchema,
  model: User,
};
