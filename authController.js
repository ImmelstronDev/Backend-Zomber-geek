import User from './models/User.js'
import Role from './models/Role.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator';
import Jwt from 'jsonwebtoken';
import secret from './config.js'

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return Jwt.sign(payload, secret.secret, {expiresIn: "24h"})
}

class authController {
    async registration (req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message: "Error with registration", errors})
            }
            const {userName, password} = req.body;
            const candidate = await User.findOne({userName});
            if(candidate) {
                return res.status(400).json({message: 'This login has exist'})
            }
            const hashPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({userName, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: " Registration has successful"})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login (req, res) {
        try {
            const {userName, password} = req.body
            const user = await User.findOne({userName})
            if(!user) {
                return res.status(400).json({message: `user ${userName} does not exist `})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: "this password is not correct, check login and password"})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers (req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new authController