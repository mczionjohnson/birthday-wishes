const express = require("express");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

const cors = require("cors");
const db = require("./database/connection");
const User = require("./model/userSchema");

const router = require("./router");

const app = express();
dotenv.config();

app.use(express.json());

app.use(express.static("public"));

app.use(cors());

db();

//using static html instead
// app.get("/", (req, res) => {
//   console.log("user visit the page");
// });

app.use("/", router);

// setup transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

//setting up the month
//gets months in Number and returns it as String
const today = (month) => {
  //   console.log(thisMonth);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${months[month - 1]}`;
};

//schedule function
let allCelebrants = (array) => {
  // for each celebrant
  array.map((val) => {
    //   setup to/from
    let mailOptions = {
      from: "mczionjohnson@gmail.com",
      to: `${val.email}`,
      subject: `Happy birthday ${val.name}`,
      html: '<p style="font-size:16px;color:#666;" >Birthday come once in a year to remind you how awesome you are. Steeze 100% Composure 100% :) break a leg! </p> <img src="cid:uniqueImage@images.ee" />',
      attachments: [
        {
          filename: "name.jpg",
          path: "images/name.jpg",
          cid: "uniqueImage@images.ee",
        },
      ],
    };

    //  send a mail
    console.log("sending an Email...");
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log(`Email sent successfully to ${val.email}`);
      }
    });
  });
};

//actual cron job function
schedule.scheduleJob("0 7 * * *", async () => {
  // schedule.scheduleJob("*/2 * * * *", async () => {
  // cron job every 07:00am

  //find in db or array
  const date = new Date().toISOString().split("T")[0];
  const [year, month, day] = date.split("-");

  convertedMonth = today(month);

  //find users
  console.log("searching for celebrants...");
  let users = await User.find({
    $and: [{ day: day }, { month: { $regex: convertedMonth, $options: "i" } }],
  });

  if (users.length >= 1) {
    console.log(`We have ${users.length} celebrants today, Hurray!`);

    //call function
    return allCelebrants(users);
  } else {
    return console.log("well, well, well, no celebrants today");
  }
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
