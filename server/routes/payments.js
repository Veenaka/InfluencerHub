const express = require("express");
const Payment = require("../models/Payments");
const router = express.Router();

router.post("/createPayment", async (req, res) => {
  const { paidto, iid, bid, project, time, amount, paidby } = req.body;
  let payment;
  try {
    payment = new Payment({
      paidto: paidto,
      influencerId: iid,
      paidby: paidby,
      businessId: bid,
      project: project,
      time: time,
      amount: amount,
    });
    await payment.save();
    res.json({ status: "ok", dfd: `${payment.influencerId}` });
  } catch (err) {
    res.json({ status: "error" });
    console.log(err);
  }
});

//Retrieve all events
router.get("/getPayment", async (req, res) => {
  let payments;
  try {
    payments = await Payment.find();
  } catch (err) {
    console.log(err);
  }
  if (!payments) {
    res.status(400).json({ message: "No products found" });
  }
  return res.status(200).json({ payments });
});

module.exports = router;
