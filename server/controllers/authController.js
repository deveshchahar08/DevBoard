const bcrypt = require('bcryptjs')
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

module.exports = {
    registerUser,
}