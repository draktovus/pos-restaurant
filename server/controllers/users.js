const express = require("express");
const User = require("../models/users");
const router = express.Router();
const { requireLogin } = require("../middleware/authorization");


//Get all
router.get("/", requireLogin(true), async (req, res, next) => {
  try {
    const data = await User.find();
    const dataEnvelope = {
      data: data,
      total: data.length,
      isSuccess: true,
    };
    res.send(dataEnvelope);
  } catch (err) {
    next(err);
  }
});

//Get by ID
router.get("/:id", requireLogin(false), async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findById(id);
    //const data = await User.findById(req.params.id);
    const dataEnvelope = {
      data: data,
      total: 1,
      isSuccess: true,
    };
    res.send(dataEnvelope);
  } catch (err) {
    next(err);
  }
});

//Post Method
router.post("/create", requireLogin(true), async (req, res, next) => {
  try {
    const data = new User({
      ...req.body,
    });
    const dataToSave = await data.save();
    const dataEnvelope = {
      data: dataToSave,
      total: 1,
      isSuccess: true,
    };
    res.send(dataEnvelope);
  } catch (err) {
    next(err);
  }
});

//Login Post Method
router.post("/login", async (req, res, next) => {
  try {
    const data = { ...req.body };

    const user = await User.findOne({ username: data.username }).exec();

    user.comparePassword(data.password, async (err, isMatch) => {
      if (err) {
        next(err);
      } else if (isMatch) {
        const token = await User.generateTokenAsync(JSON.parse(JSON.stringify(user)), '1d')
        const cleanUser = {...JSON.parse(JSON.stringify(user)), token:token}
        const dataEnvelope = {
          data: cleanUser,
          total: 1,
          isSuccess: true,
        };
        res.send(dataEnvelope);
      } else {
        next(new Error("Password didn't match."));
      }
    });
  } catch (err) {
    next(err);
  }
});



//Update by ID Method
router.patch("/update/:id", requireLogin(true), async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = { ...req.body };

    const user = await User.findByIdAndUpdate(id).exec();
    user.id = data.id;
    user.password = data.password;
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.isAdmin = data.isAdmin;
    await user.save();
    const dataEnvelope = {
      data: user,
      total: 1,
      isSuccess: true,
    };
    res.send(dataEnvelope);
  } catch (err) {
    next(err);
  }
});

//Update by ID Method
router.patch("/update-stripe", requireLogin(), async (req, res, next) => {
  try {
    const data = { ...req.body };
    const user = await User.findOne({_id:data._id}).exec();

    await user.updateOne({stripe_data:data.stripe_data}).exec();
    // send new user data back
    const newUser = await User.findOne({username:data.username, id:data.id})
    const dataEnvelope = {
      data: newUser,
      total: 1,
      isSuccess: true,
    };
    res.send(dataEnvelope);
  } catch (err) {
    next(err);
  }
});

//Delete by ID Method
router.delete("/delete/:id", requireLogin(true) ,async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOneAndDelete({ _id: id });
    const dataEnvelope = {
      data: data,
      total: 1,
      isSuccess: true,
    };
    res.send(dataEnvelope);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
