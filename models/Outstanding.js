const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OutstandingSchema = new Schema({
  name: String,
  dueDate: String,
});

module.exports = Outstanding = mongoose.model("Outstanding", OutstandingSchema);
