const express = require("express");
const User = require("../models/users");
const router = express.Router();

//Get all
router.get("/", async (req, res, next) => {
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
router.get("/:id", async (req, res, next) => {
  try {
    const data = await User.findOne({id: +req.params.id})
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
router.post("/", async (req, res, next) => {
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
    res.send(dataEnvelope)
  } catch (err) {
    next(err);
  }
});

//Login Post Method
router.post("/login", async (req, res, next) => {
    try {
      const data = new User({
        ...req.body,
      });
      
      const dataToSave = await data.save();
      const dataEnvelope = {
        data: dataToSave,
        total: 1,
        isSuccess: true,
      }

      res.send(dataEnvelope)
    } catch (err) {
      next(err);
    }
  });

//Update by ID Method
router.patch("/update/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await User.findOneAndUpdate({id: id}, updatedData, options);

    const dataEnvelope = {
      data: result,
      total: 1,
      isSuccess: true,
    };

    res.send(dataEnvelope);
  } catch (err) {
    next(err);
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const data = await User.findOneAndDelete({id:id});
    const dataEnvelope = {
        data: data,
        total: 1,
        isSuccess: true,
    }
    res.send(dataEnvelope)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
