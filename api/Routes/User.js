const express = require("express");
const userRoute = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../Models/User");
const generateToken = require('../tokenGenerate');
const protect = require("../middleware/Auth");

userRoute.post('/login', asyncHandler(
    async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                createdAt: user.createdAt,
            })
        } else {
            res.status(401);
            throw new Error("invalid email or password");
        }
    })
)

// register routes
userRoute.post("/", asyncHandler(
    async (req, res) => {
        const {email, password, name} = req.body;
        const existUser = await User.findOne({email});
        if(existUser){
            res.status(400);
            throw new Error ("User already exist");
        }else{
            const user = await User.create({
                name, email, password
            })
            if(user){
                res.status(201).json({
                    _id:user.id,
                    name:user.name,
                    email:user.email,
                    password:user.password,
                    isAdmin:user.isAdmin,
                    createdAt:user.createdAt,
                })
            }else{
                res.status(400);
                throw new Error("invalid user data");
            }
        }
    })
)

// get auth profile data
userRoute.get("/profile", protect, asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id:user._id,
            email:user.email,
            name:user.name,
            isAdmin:user.isAdmin,
            createdAt:user.createdAt,
        })
    }else{
        res.status(404);
        throw new Error("user not found");
    }
}))

// user profile update
userRoute.put("/profile", protect, asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id:updatedUser._id,
            email:updatedUser.email,
            name:updatedUser.name,
            isAdmin:updatedUser.isAdmin,
            createdAt: updatedUser.createdAt,
            token:generateToken(updatedUser._id)
        })
    }else{
        res.status(404);
        throw new Error("user not found");
    }
}))

module.exports = userRoute;