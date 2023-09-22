const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please, Enter Your username"],
        maxLength: [15, "Username can't exceed 15 character"],
        unique: [true, "This username is already taken"],
        minLength: [3, "Username Should have more than 3 character"]
    },
    email: {
        type: String,
        required: [true, "Please, Enter Your email"],
        unique: [true, "This email is already registered"],
        validate: [validator.isEmail, "Please, Enter a valid email"]
    },
    firstname: {
        type: String,
        required: [true, "Please, Enter Your First Name"],
        maxLength: [15, "First Name can't exceed 15 character"],
        minLength: [3, "First Should have more than 3 character"]
    },
    lastname: {
        type: String,
        required: [true, "Please, Enter Your Last Name"],
        maxLength: [15, "Last Name can't exceed 15 character"],
        minLength: [3, "Last Should have more than 3 character"]
    },
    age: {
        type: Number,
        default: null
        // required: [true, "Please, Enter Your age"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your password"],
        minLength: [4, "password Length must be greater than 8"],
        select: false
    },
    role: {
        type: String,
        enum: ["patient","admin","docter"],
        default: "patient"
    }
});


// can't use arrow function because we need to access this keyword
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10,)
})


// for creation of jwt token only will be created if user is validated
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const userModel = mongoose.model("User", userSchema, "Users");
module.exports = userModel;