const admin = require("firebase-admin");
const serviceAccount = require("../fcm-demo-54c7d-firebase-adminsdk-4mgtc-64e892735c.json");
const LeaveRequest = require("../models/LeaveRequest");

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

function listenToLeaveRequestChanges() {
  const changeStream = LeaveRequest.watch(); // Watching for all changes

  changeStream.on("change", (change) => {
    console.log("Change detected:", change);
    if (change.operationType === "insert") {
      const leaveRequestDetails = change.fullDocument;
      console.log("New leave request added:", leaveRequestDetails);

      // Perform actions based on the change
      // e.g., send email notifications, update related systems, etc.

      notifyUser("", leaveRequestDetails);
    }
  });
}

module.exports = listenToLeaveRequestChanges;
