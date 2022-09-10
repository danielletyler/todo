//defines routes to api and what to do there given the api call

const express = require("express");
const router = express.Router();
const mongo = require("mongoose");
const Item = mongo.model("Item");

router.get("/", (req, res) => {
  res.json("Hello");
});

//create
router.post("/items", (req, res) => {
  console.log(req.body);
  const { value1, value2, value3, value4 } = req.body;
  const new_item = new Item({
    value1,
    value2,
    value3,
    value4,
  });

  new_item
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
    });
});

//read
router.get("/items", (req, res) => {
  Item.find()
    .then((item) => {
      if (!item) {
        res.status(404).json({ error: "list is empty" });
      }
      res.json({ item });
    })
    .catch((err) => console.log(err));
});

//update
router.put("/items/:id", (req, res) => {
  const { value1, value2, value3, value4 } = req.body;
  Item.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        value1: value1,
        value2: value2,
        value3: value3,
        value4: value4,
      },
    },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        res.status(404).json({ error: "item not found" });
      }
      res.json({ item });
    })
    .catch((err) => console.log(err));
});

//delete
router.delete("/items/:id", (req, res) => {
  Item.findByIdAndDelete(req.params.id)
    .then((item) => {
      if (!item) {
        res.status(404).json({ error: "item not found" });
      }
      res.json({ item });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
