const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
    id:{
        type: Number,
        required: true,
    },
    firstName:{
        type: String,
        required: [true, "User needs a first name."],
    },
    lastName:{
        type: String,
        required: [true, "User needs a last name."],
    },
    username:{
        type: String,
        required: [true, "User needs a username."],
        unique: true
    },
    password:{
        type: String,
        required: [true, "User needs a password."],
        minlength: 6,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    },
});

const User = model("User", userSchema)
module.exports = {User}