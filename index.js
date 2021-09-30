const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Bind mongoDB connection error msg
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/outstandings", require("./routes/outstandings"));

app.listen(process.env.PORT || 5000, () => console.log("Server started."));
