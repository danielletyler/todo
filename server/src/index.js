//boilerplate setup for server and db connection

const mongo = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;

//connection url from mongobd at;as cluster goes here
const mongoUrl =
  "mongodb+srv://dt07171109:H2t3ZKTEKgExWmo5@cluster0.ajuk5np.mongodb.net/?retryWrites=true&w=majority";

mongo
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((connect) => console.log("mongoDb connect"))
  .catch((err) => console.log("error", err));

//require model files here
require("./model/item");

app.use(cors());
app.use(express.json());

//tell app where routes are (file in routes)
app.use(require("./routes/item-routes"));

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
