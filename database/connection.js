const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.DEV_DATABASE)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

module.exports = db;
