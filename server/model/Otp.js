const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
 email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
  // ❌ No expiration logic needed if you want to store permanently
});

module.exports = mongoose.model("Otp", otpSchema);
