const express = require("express");
const { Notification } = require("../models/notifications");
const router = express.Router();

//save notifications
router.post("/createNotification", (req, res) => {
  let newNotification = new Notification(req.body);
  newNotification.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Notification saved successfully",
    });
  });
});

//retrieve notifications
router.get("/notifications", (req, res) => {
  Notification.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

//get notifications of a specific user
router.get("/notification/:id", (req, res) => {
  Notification.find({ ReceiverId: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

router.delete("/notification/delete/:id", (req, res) => {
  Notification.findByIdAndRemove(req.params.id).exec(
    (err, deletedNotification) => {
      if (err) {
        return res.status(400).json({
          message: "Delete unsuccessful",
          err,
        });
      }
      return res.json({
        message: "Delete successful",
        deletedNotification,
      });
    }
  );
});

module.exports = router;
