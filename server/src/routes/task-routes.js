//defines routes to api and what to do there given the api call

const express = require("express");
const router = express.Router();
const mongo = require("mongoose");
const Task = mongo.model("Task");

router.get("/", (req, res) => {
  res.json("Hello");
});

//create
router.post("/tasks", (req, res) => {
  console.log(req.body);
  const { desc, due_date, isComplete, CollectionId } = req.body;
  const new_task = new Task({
    desc,
    due_date,
    isComplete,
    CollectionId,
  });

  new_task
    .save()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
    });
});

//read
router.get("/tasks", (req, res) => {
  Task.find()
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: "list is empty" });
      }
      res.json({ task });
    })
    .catch((err) => console.log(err));
});

//getbyCollection
router.get("/tasks/:coll", (req, res) => {
  Task.find({ CollectionId: req.params.coll })
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: "list is empty" });
      }
      res.json({ task });
    })
    .catch((err) => console.log(err));
});

//update
router.put("/tasks/:id", (req, res) => {
  const { desc, due_date, isComplete, CollectionId } = req.body;
  Task.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        desc: desc,
        due_date: due_date,
        isComplete: isComplete,
        CollectionId: CollectionId,
      },
    },
    { new: true }
  )
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: "task not found" });
      }
      res.json({ task });
    })
    .catch((err) => console.log(err));
});

//delete
router.delete("/tasks/:id", (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then((task) => {
      if (!task) {
        res.status(404).json({ error: "task not found" });
      }
      res.json({ task });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
