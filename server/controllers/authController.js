const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require('../models/user')

const registerUser = async (req, res) =>{
    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({
                message: 'user already exist'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'user registered successfuly',
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch(error){
        res.status( 500).json({
            message: 'server error',
            error: error.message,
        })
    }    
}

const loginUser = async (req, res) => {
    try{
        const { email, password} = req.body;

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message: "invalid email or password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(401).json({
                message: "invalid email or password"
            })
        }

        const token = jwt.sign(
            {userID: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.status(200).json({
            message: "login successfull",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch(error) {
        res.status(500).json({
            message: "server error",
            error: error.message,
        })
    }
}

const getMe = async(req, res)=>{
    try{
        const user = await User.findById(req.user).select("-password")

            if(!user) {
                return  res.status(404).json({
                    message: "user not found"
                })
            }

            
           res.status(200).json(user)
        }catch(error){
            res.status(500).json({
                message: 'server error',
                error: error.message,
            })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}