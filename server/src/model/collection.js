//model for collection objects

const mongo = require("mongoose");

const collectionSchema = mongo.Schema({
  title: {
    type: String,
    required: true,
  },
});

mongo.model("Collection", collectionSchema);
