const express = require("express");

const router = express.Router();
const User = require("./model/userSchema");

const generateMiddleWare = require("./middleware/userRegister.middleware");
const registerSchema = require("./middleware/validation/userRegister.validation");

//user signup form
router.post(
  "/v1/join",
  generateMiddleWare(registerSchema),
  async (req, res) => {
    const name = req.body.name_text;
    const email = req.body.email_text;
    const day = req.body.day_text;
    const month = req.body.month_text;

    const payload = {};
    if (name) {
      payload.name = name;
    }
    if (email) {
      payload.email = email;
    }
    if (day) {
      payload.day = day;
    }
    if (month) {
      payload.month = month;
    }

    try {
      const check = await User.findOne({ email: email });
      if (check) {
        console.log("unsuccessful, user already exist");
        return res
          .status(400)
          .json({ message: "unsuccessful, user already exist" });
      } else {
        const user = new User({
          ...payload,
        });

        const savedUser = await user.save();
        console.log({ message: "new user saved", savedUser });

        return res.status(200).json({ message: "success", savedUser });
      }
    } catch (error) {
      console.log(error.message);
      // return res.status(4).json({ message: "success", savedUser });
    }
  }
);

module.exports = router;
