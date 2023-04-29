const express = require("express");
const Product = require("../models/products");
const router = express.Router();

//Get all
router.get("/", async (req, res, next) => {
  try {
    const data = await Product.find();
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
    const data = await Product.findOne({ _id: req.params.id });
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
router.post("/create", async (req, res, next) => {
  try {
    console.log(req.body)
    const data = new Product({
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

//Update by ID Method
router.patch("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = { ...req.body };
    const options = { new: true };

    const product = await Product.findByIdAndUpdate(id, data, options).exec();

    const dataEnvelope = {
      data: product,
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
    const id = req.params.id;
    const data = await Product.findOneAndDelete({ _id: id });
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
