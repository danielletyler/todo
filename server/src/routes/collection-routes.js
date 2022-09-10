//defines routes to api and what to do there given the api call

const express = require("express");
const router = express.Router();
const mongo = require("mongoose");
const Collection = mongo.model("Collection");

router.get("/", (req, res) => {
  res.json("Hello");
});

//create
router.post("/collections", (req, res) => {
  console.log(req.body);
  const { title } = req.body;
  const new_coll = new Collection({
    title,
  });

  new_coll
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
    });
});

//read
router.get("/collections", (req, res) => {
  Collection.find()
    .then((coll) => {
      if (!coll) {
        res.status(404).json({ error: "list is empty" });
      }
      res.json({ coll });
    })
    .catch((err) => console.log(err));
});

//update
router.put("/collections/:id", (req, res) => {
  const { title } = req.body;
  Collection.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: title,
      },
    },
    { new: true }
  )
    .then((coll) => {
      if (!coll) {
        res.status(404).json({ error: "collection not found" });
      }
      res.json({ coll });
    })
    .catch((err) => console.log(err));
});

//delete
router.delete("/collections/:id", (req, res) => {
  Collection.findByIdAndDelete(req.params.id)
    .then((coll) => {
      if (!coll) {
        res.status(404).json({ error: "item not found" });
      }
      res.json({ coll });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
