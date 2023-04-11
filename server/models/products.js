const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Generate fields for mongoose for product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product needs a name."],
    },
    requiresId: {
        type: Boolean,
        required: [false, "Product needs to indicate if Identification is required."],
    },
    quantity: {
        type: Number,
        required: [true, "Product needs a quantity for stock keeping purposes."],
        default: 0
    },
    SKU: {
        type: String,
        required: [true, "Product needs a SKU."],
        unique: true
    },
    UPC: {
        type: String,
        required: [true, "Product needs a UPC."],
        unique: true
    },
    description: {
        type: String,
        required: [true, "Product needs a description."],
    },
    price: {
        type: Number,
        required: [true, "Product needs a price."],
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Product = model("Product", productSchema)
module.exports = Product