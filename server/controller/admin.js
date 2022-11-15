const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require("../models/user");
const { json } = require('express/lib/response');
const salt = bcrypt.genSaltSync(Number(process.env.SALT));


const getAllUsers = (req,res) =>{
    User.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
}

const getNewUsrCount = (req,res) =>{
    var query = User.find({adminVerified:'false'})
    query.count(function(err, count) {
        if (err) {
            console.log(err);
        } else {
           res.json({count});
        }
    });
}

const delUser = (req,res) =>{
    User.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            res.json({status:'error'});
        }else{
            res.json({status:'ok'});
        }
    })
}

const registerAdmin = async(req,res) =>{
    console.log(req.body)
    try {
		const newPassword = await bcrypt.hash(req.body.password, salt);
        console.log(newPassword);
        await User.create({
            firstName: req.body.fname,
            lastName: req.body.lname,
            email: req.body.email,
            phoneNo: req.body.contactNo,
            category: 'admin',
            isActive: 'true',
            verified: 'true',
            adminVerified: 'true',
            isFirstLogin: 'true',
            password: newPassword,
        })
        res.json({ status: 'ok' })
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
}

const adminLogin = async(req,res) =>{
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid login' })
    }


    const isPasswordValid = await bcrypt.compareSync(
        req.body.password,
        user.password
    );
    if (isPasswordValid) {
        const login = user.isFirstLogin;
        const token = jwt.sign({
                id: user._id,
                name: user.firstName,
                email: user.email
            },
            'secret123'
        )

        return res.json({ status: 'ok', user: token, test: login })
    } else {
        console.log('invalid password')
        return res.json({ status: 'error', user: false })
    }
}

const firstlogin = async(req,res) => {
    try {
        const password = req.body.passwordNew;
        const email = req.body.email;
        const user = await User.findOne({
            email: req.body.email,
        })

        if (!user) {
            return { status: 'error', error: 'Invalid login' }
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        
        if (isPasswordValid) {
            console.log('duplicate password');
            return res.json({ status: 'duplicate', error: 'duplicate password' });
        } else {
            const newPassword = await bcrypt.hash(password, salt);
            await User.findByIdAndUpdate(req.params.id, {
                password: newPassword,
                isFirstLogin: false
            }, res.json({ status: 'ok' }))
        }
    } catch (err) {
        res.json({ status: 'error' });
        console.log(err);
    }
}

const sendAdminInfo = async(req,res) =>{
    try {
        User.findById(req.params.id, (result, err) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result.data);
            }

        });
    } catch (err) {
        res.json(err);
    }
}

const editAccount = async(req,res) =>{
    if (req.body.password) {
        try {
            console.log(req.body.email);

            const user = await User.findOne({
                email: req.body.email
            })

            if (!user) {
                return res.json({ status: 'error', error: 'Invalid login' })
            }

            const isPasswordValid = await bcrypt.compare(
                req.body.oldPassword,
                user.password
            );
            console.log(isPasswordValid);

            if (isPasswordValid) {
                console.log('correct old password');
                const salt = bcrypt.genSaltSync(10);
                const newPassword = await bcrypt.hash(req.body.password, salt);
                await User.findByIdAndUpdate(req.params.id, {
                    firstName: req.body.fname,
                    lastName: req.body.lname,
                    email: req.body.email,
                    phoneNo: req.body.contactNo,
                    password: newPassword
                }, res.json({ status: 'ok' }))

            } else {
                return res.json({ status: 'error', user: false })
            }
        } catch (err) {
            console.log(err);
            res.json({ status: 'error' });
        }
    } else {
        try {
            console.log('no password');
            await User.findByIdAndUpdate(req.params.id, {
                firstName: req.body.fname,
                lastName: req.body.lname,
                email: req.body.email,
                phoneNo: req.body.contactNo
            }, res.json({ status: 'ok' }))
        } catch (err) {
            console.log(err);
            res.json({ status: 'error' });
        }
    }
}



const suspendAccount = async(req,res) =>{
    if(req.body.category === 'admin'){
        try{
            console.log('account suspended');
            await User.findByIdAndUpdate(req.params.id,{
                suspendedDate:req.body.suspendedDate,
                restoreDate:req.body.restoreDate,
                isActive:req.body.isActive
            }), res.json({status: 'ok'})
        }catch(err){
            console.log(err);
            res.json({status:'error'});
        }
    }else{
        res.json({status:'error'});
    }
}

const restoreAccount = async(req,res) =>{
    try{
        console.log('account restored');
        await User.findByIdAndUpdate(req.params.id,{
            isActive:req.body.isActive
        }), res.json({status: 'ok'})
    }catch(err){
        console.log(err);
        res.json({status:'error'});
    }
}

const approveUser = async(req,res) => {
    try{
        console.log('account approved');
        await User.findByIdAndUpdate(req.params.id,{
            isActive:req.body.isActive,
            adminVerified:req.body.adminVerified,
        }), res.json({status: 'ok'})
    }catch(err){
        console.log(err);
        res.json({status:'error'});
    }
}

exports.approveUser = approveUser
exports.restoreAccount = restoreAccount
exports.suspendAccount = suspendAccount
exports.editAccount = editAccount
exports.sendAdminInfo = sendAdminInfo
exports.getAllUsers = getAllUsers
exports.getNewUsrCount = getNewUsrCount
exports.delUser = delUser
exports.registerAdmin =registerAdmin
exports.adminLogin = adminLogin
exports.firstlogin = firstlogin