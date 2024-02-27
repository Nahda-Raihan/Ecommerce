const { compare } = require("bcrypt")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name!"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"]
    },
    phoneNumber: {
        type: Number,
    },
    address: [
        {
            country: {
                type: String,
            },
            city: {
                type: String,
            },
            address1: {
                type: String,
            },
            address1: {
                type:String
            },
            zipCode: {
                type:String,
            },
            addressType: {
                type: String
            },
        },
    ],
    role: {
        type: String,
        default: "user"
    },
    avatar: {
        public_id : {
            type: String,
            required:false,
        },
        url: {
            type: String,
            required: false,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    resetPasswordToken: String,
    resetPasswordTime: Date,
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//jwt token
userSchema.methods.getJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    })
}

//compare password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", userSchema)