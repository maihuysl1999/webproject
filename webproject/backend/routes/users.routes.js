const express = require('express');
const bcryptjs = require('bcryptjs');

const userModel=require('../models/users.schema');

const usersRouter = express.Router();

usersRouter.post(('/signup'),(req,res)=>{
    console.log('req',req.body);
    res.status(200).json({
        success: true,
        message: "Login Success",
        data: {
            email: req.body.email,
        }
    });
})

usersRouter.post(('/register'), async (req, res) => {
    try {
        //validate email, password, fullname
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if (!emailRegex.test(req.body.email)) {
            res.status(400).json({
                success: false,
                message: "Invalid email address"
            });
            console.log(res)
        } else if (req.body.password.length < 6) {
            res.status(400).json({
                success: false,
                message: "Password  too short"
            });
        } else {

            // check email exist
            var data = await userModel.findOne({ email: req.body.email }).lean();
            if (data) {
                res.status(400).json({
                    success: false,
                    message: "Email has been used"
                });
            } else {
                //hash pw
                const hashPassword = bcryptjs.hashSync(req.body.password, 10);
                //create user record
                let newUser = new userModel({
                    name: req.body.name,
                    phonenumber: req.body.phonenumber,
                    email: req.body.email,
                    password: hashPassword
                })

                await newUser.save()
                res.status(201).json({
                    success: true,
                    data: newUser,
                });
                
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
})

usersRouter.post('/login', async(req, res) => {
    try {
        var data = await userModel.findOne({ email: req.body.email }).lean();
        if (!data) {
            res.status(400).json({
                success: false,
                message: "Email doesn't exist"
            });
        } else if (!bcryptjs.compareSync(req.body.password, data.password)) {
            res.status(400).json({
                success: false,
                message: "Wrong Password"
            });
        } else {
            req.session.currentUser = {
                _id: data._id,
                email: data.email
            }
            res.status(200).json({
                success: true,
                message: "Login Success",
                data: {
                    email: data.email,
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    
} )

usersRouter.get('/logout' , (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.json({
                success: false,
                message: err.message
            })
        } else {
            res.json({success: true});
        }
    });
})

module.exports =usersRouter;