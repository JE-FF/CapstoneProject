const { Router } = require("express");
const garden = require("../models/Garden.js");
const router = Router();

// Create record in MongoDB
router.post("/", (request, response) => {
  const newGarden = new garden.model(request.body);
  newGarden.save((error, data) => {
    return error ? response.sendStatus(500).json(error) : response.json(data);
  });
});

// Query records from MongoDB
router.get("/", (request, response) => {
  garden.model.find({}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

// findById is more efficient than querying the property within {} in the previous get request ^.
router.get("/:id", (request, response) => {
  garden.model.findById(request.params.id, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

router.delete("/:id", (request, response) => {
  // findById params (ID that matches database entry, filter by entry properties, error or data)
  garden.model.findByIdAndRemove(request.params.id, {}, (error, data) => {
    if (error) return response.sendStatus(500).json(error);
    return response.json(data);
  });
});

// $set is a mongoose / mongoDB function that checks the properties are valid and commits changes.
router.put("/:id", (request, response) => {
  const body = request.body;
  garden.model.findByIdAndUpdate(
    request.params.id,
    {
      $set: {
        gardenName: body.gardenName,
        gardens: body.gardens,
      },
    },
    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

module.exports = router;
