const mongoose = require("mongoose");

const LeaveRequestSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Annual", "Sick", "Maternity", "Paternity", "Other"],
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Denied"],
    },
    reason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LeaveRequest", LeaveRequestSchema);
