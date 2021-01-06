import { Router } from 'express';
const AuthRouter = Router();
import {UserModel} from '../module/index'
import {sha512} from 'js-sha512'
const jwt = require('jsonwebtoken');
//const UserModel = require('../module/auth.module')
AuthRouter.post('/register', async function(req, res) {
    try{
        const {email,password} = req.body
        //res.send(sha512.hmac('password', password))
        const candidat = await UserModel.findOne({email})

        if(candidat){
            return res.status(400).json({ message: 'Email is using'})
        }
        
        const user = new UserModel({
            email,
            password: sha512.hmac('password', password)
        })
        console.log(user)
        await user.save()
        res.status(201).json({message: 'User create' })
        
    }catch (error){
        res.send(error)
    }
});
AuthRouter.post('/login', async function(req, res) {
    try{
        console.log(req.body)
        const {email,password} = req.body
        //res.send(sha512.hmac('password', password))
        const user = await UserModel.findOne({email})

        if(!user)
            return res.status(400).json({message: 'User not found'})
        //.json({ message: 'User not found'})
        
        
        if(user.password !== sha512.hmac('password', password))
            res.status('400').json({message: 'Password incorrect'})


        const token = jwt.sign({userId: user.id}, 'shhhh', { expiresIn: '1' });
       
        res.status(201).json({ token, userId: user.id })

    }catch (error){
        res.status('500').send(error)
    }
});
AuthRouter.post('/refreshtoken', async function(req, res) {
})


export default AuthRouter