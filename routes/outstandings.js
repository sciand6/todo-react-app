const Oustanding = require("../models/Outstanding");
const express = require("express");
const Outstanding = require("../models/Outstanding");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

router.get("/getOutstandings", authenticate, (req, res) => {
  Outstanding.find({})
    .then((data) => res.json(data))
    .catch((err) => {
      res.status(400).json({ msg: "Error getting outstandings." });
    });
});

router.post("/createOutstanding", authenticate, (req, res) => {
  let { name, dueDate } = req.body;

  const outstanding = new Outstanding({
    name,
    dueDate,
  });

  outstanding
    .save()
    .then(() => {
      res.json({ success: "Outstanding saved successfully." });
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Error creating the outstanding." });
    });
});

router.put("/editOutstanding/:id", authenticate, (req, res) => {
  let { name, dueDate } = req.body;

  Outstanding.findById(req.params.id, (err, outstanding) => {
    if (err) {
      return res.status(400).json({ msg: "Error getting the outstanding." });
    } else {
      if (name !== "") outstanding.name = name;
      if (dueDate !== "") outstanding.dueDate = dueDate;

      outstanding
        .save()
        .then((outstanding) => {
          return res.json(outstanding);
        })
        .catch((err) => {
          return res.status(400).json({ msg: "Error saving the outstanding." });
        });
    }
  });
});

router.delete("/deleteOutstanding/:id", authenticate, (req, res) => {
  Outstanding.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      return res
        .status(400)
        .json({ msg: "There was a problem deleting that outstanding." });
    }

    res.json({ success: "Outstanding deleted successfully." });
  });
});

module.exports = router;
