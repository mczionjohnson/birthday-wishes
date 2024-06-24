const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
});

// module.exports= mongoose.model("Users", UserSchema);
const User = mongoose.model("User", userSchema);
module.exports = User;
