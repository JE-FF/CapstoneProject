const { Router } = require("express");
const garden = require("../models/Garden");
const router = Router();

// Create record in MongoDB
router.post("/", (request, response) => {
  const newGarden = new garden.model(request.body);
  newGarden.save((err, garden) => {
    return err ? response.sendStatus(500).json(err) : response.json(garden);
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
        crust: body.crust,
        cheese: body.cheese,
        sauce: body.sauce,
        toppings: body.toppings
      }
    },

    (error, data) => {
      if (error) return response.sendStatus(500).json(error);
      return response.json(request.body);
    }
  );
});

module.exports = router;
