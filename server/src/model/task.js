//model for task objects

const { Date } = require("mongoose");
const mongo = require("mongoose");

const taskSchema = mongo.Schema({
  desc: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
  CollectionId: {
    type: String,
    required: true,
  },
});

mongo.model("Task", taskSchema);
