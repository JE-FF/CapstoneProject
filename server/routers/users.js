const { Router } = require("express");
const user = require("../models/User.js");
const router = Router();

// Create record in MongoDB
router.post("/", (request, response) => {
  const newUser = new user.model(request.body);
  newUser.save((error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

// Query records from MongoDB
router.get("/", (request, response) => {
  user.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

// findById is more efficient than querying the property within {} in the previous get request ^.
router.get("/:id", (request, response) => {
  user.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  // findById params (ID that matches database entry, filter by entry properties, error or data)
  user.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

// $set is a mongoose / mongoDB function that checks the properties are valid and commits changes.
router.put("/:id", (request, response) => {
  const body = request.body;
  user.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        userName: body.userName,
        gardens: body.gardens
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

module.exports = router;
