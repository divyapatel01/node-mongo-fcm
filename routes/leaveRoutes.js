const express = require("express");
const LeaveRequest = require("../models/LeaveRequest");
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../fcm-demo-54c7d-firebase-adminsdk-4mgtc-64e892735c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function notifyUser(deviceToken, leaveRequestDetails) {
  const message = {
    notification: {
      title: "Leave Request Update",
      body: `Your leave request from ${leaveRequestDetails.startDate} to ${leaveRequestDetails.endDate} has been ${leaveRequestDetails.status}.`,
    },
    token: deviceToken,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

// Route to create a new leave request
router.post("/leave-requests", async (req, res) => {
  try {
    const deviceToken = req.query.deviceToken;
    const leaveRequest = new LeaveRequest(req.body);
    await leaveRequest.save();
    notifyUser(deviceToken, leaveRequest);
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
