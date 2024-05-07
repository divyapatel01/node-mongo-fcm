const express = require("express");
const LeaveRequest = require("../models/LeaveRequest");
const router = express.Router();

// Route to create a new leave request
router.post("/leave-requests", async (req, res) => {
  try {
    const leaveRequest = new LeaveRequest(req.body);
    await leaveRequest.save();
    res.status(201).send(leaveRequest);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Route to get all leave requests
router.get("/leave-requests", async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.status(200).send(leaveRequests);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
