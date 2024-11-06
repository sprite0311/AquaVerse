import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message : "User doesn't exist"})
        const isPasswordCorrect =await bcrypt.compare(password, existingUser.password);
        console.log(isPasswordCorrect)
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials"})
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.SECRET_KEY, {expiresIn: "1h"})
        res.status(200).json({result: existingUser, token})
        console.log(existingUser)
    } catch (error) {
        res.status(500).json({message: "Something went wrong"})
    }
}
export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName, role} = req.body
    try {
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(404).json({message : "User already exist"})
        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match"})
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`, role})
        const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRET_KEY, {expiresIn: '1h'})
        console.log(token, result)
        res.status(200).json({result, token})
    } catch (error) {
        res.status(500).json({message: error})
    }
}