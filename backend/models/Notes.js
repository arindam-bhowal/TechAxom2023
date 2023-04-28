const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    userId: Schema.Types.ObjectId,
    url: String,
    videoTitle: String,
    topic: String,
    title: String,
    timestamped: String,
    currentTime: String,
    content: String,
    snaped: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("notes", noteSchema);
