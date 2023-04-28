const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  isAdmin: Boolean
}, 
{timestamps: true}
);

module.exports = mongoose.model("users", userSchema);