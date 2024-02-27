const express = require('express')
const path = require('path')
const { upload } = require("../multer")
const fs = require('fs')
const User = require("../Model/User")
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/ErrorHandler')
const sendMail = require("../utils/sendMail")
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const { isAuthenticated } = require('../middleware/auth')

const router = express.Router()


router.post('/create-user', upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userEmail = await User.findOne({ email })
        if (userEmail) {
            const fileName = req.file.filename;
            const filePath = `uploads/${fileName}`
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ message: "Error Deleting File" })
                }
                else {
                    res.json({ message: "file deleted successfully" })
                }
            })
            return next(new ErrorHandler("user already exists", 400))
        }
        const fileName = req.file.filename;
        const fileUrl = path.join(fileName)

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl,
        }
        const activationToken = createActivationToken(user)
        const activationUrl = `http://localhost:5173/activation/${activationToken}`
        try{                //activation email sent to user with a link to activation url
            await sendMail({
                email: user.email,
                subject: "Activate Your Account",
                message: `Hello ${user.name}, Please click to activate your account: ${activationUrl}`,
            })
            res.status(201).json({                      //it responds with a success message instructing user to check email activation
                success: true,
                message: `Please check your mail :- ${user.email} to activate your Account`,
            });
        }
        catch(err) {
            return next(new ErrorHandler(err.message, 400))
        }
    }
    catch (err) {
        return next(new ErrorHandler(err.message, 400))
    }
})

const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    })
}


router.post("/activation", catchAsyncErrors(async(req,res,next)=>{
    try{
 const {activation_token}=req.body
 const  newUser=jwt.verify(
    activation_token,
    process.env.ACTIVATION_SECRET
 )
 if(!newUser){
    return next (new ErrorHandler("invalid Token", 400))
 }

 const {name,email,password,avatar}= newUser
 User.create({name,email,password,avatar})
 
 sendToken(newUser,201,res)
    } catch (err){
        return next(new ErrorHandler(err.message,500));
    }
}))


//login user

router.post(
    "/login-user",
    catchAsyncErrors(async (req,res,next) => {
        try{
            const {email, password} = req.body;
            if(!email || !password){
                return next(new ErrorHandler ("Please Provide all fields",400));
            }
            const user = await User.findOne({email}).select("+password");
            if(!user){
                return next(new ErrorHandler("requested user not found,400"))
            }
            const isPasswordValid = await user.comparePassword(password);
            if(!isPasswordValid){
                return next(new ErrorHandler("Invalid Credentials", 400));
            }
            sendToken(user,201,res);
        }catch(err){
            return next(new ErrorHandler(err.message,500));
        }
    })
)


router.get('/getuser', isAuthenticated, catchAsyncErrors(async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id)
        if(!user){
            return next(new ErrorHandler("Requested user not found", 400))
        }
        res.status(200).json({
            success: true,
            user
        })
    }catch(err){
        return next(new ErrorHandler(err.message, 500))
    }
}))
module.exports = router;