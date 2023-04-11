const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const idSchema = new Schema({
    requiresId: {
        type:Boolean
    },
    ageRequirement: {
        type:Number,
        required: function(){
            return this.requiresId
        }
    }
})

// Generate fields for mongoose for product schema
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Product needs a name."],
        minLength: [1, "Product name length must be greater or equal to 1."]
    },
    identification: {
        type: idSchema,
        required: false,
    },
    quantity: {
        type: Number,
        required: [true, "Product needs a quantity for stock keeping purposes."],
        default: 0
    },
    SKU: {
        type: String,
        required: [true, "Product needs a Stock Keeping Unit."],
        unique: true,
        minLength: [1, "Product SKU length must be greater or equal to 1."]
    },
    UPC: {
        type: String,
        required: [true, "Product needs a Universal Product Code."],
        unique: true,
        minLength: [1, "Product UPC length must be greater or equal to 1."]
    },
    description: {
        type: String,
        required: [true, "Product needs a description, even if empty."],
    },
    price: {
        type: Number,
        required: [true, "Product needs a price."],
        default: 1.000
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