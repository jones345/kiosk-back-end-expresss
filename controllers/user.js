import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
// const CryptoJS = require("crypto-js");
import CryptoJS from 'crypto-js';
import Doctor from "../models/Doctor.js";

export const signin = async (req, res) => {
    try {
        // check if user is present with email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("no user with that Account");
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
        res.status(401).json("Wrong password or username!");
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,

            { expiresIn: "5d" }
        );
        const logginedUser = ({
            loggined: true,
        });
        const userlogginedIn = await User.findByIdAndUpdate(user._id, {loggined:true}, {new: true});

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken,userloggin:userlogginedIn });
    } catch (err) {
        res.status(500).json(err);
    }
}



export const signindoc = async (req, res) => {
    try {
        // check if user is present with email
        const user = await Doctor.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("no user with that Account");
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
        res.status(401).json("Wrong password or username!");
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.SECRET_KEY,

            { expiresIn: "5d" }
        );
        const logginedUser = ({
            loggined: true,
        });
        const userlogginedIn = await User.findByIdAndUpdate(user._id, {loggined:true}, {new: true});

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken,userloggin:userlogginedIn });
    } catch (err) {
        res.status(500).json(err);
    }
}


export const signup = async (req, res) => {

    let ciphertext;
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        idNumber: req.body.idNumber,
        gender:req.body.gender,
        password:  ciphertext = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),

    });

    try{
        const user = await newUser.save();
        res.status(201).json(user)
    }catch(err){
        res.status(500).json(err);
    }
}

export const signupdoc = async (req, res) => {

    let ciphertext;
    let pass = "Password@123"
    const newUser = new Doctor({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        password:  ciphertext = CryptoJS.AES.encrypt(pass, process.env.SECRET_KEY).toString(),
    });
    console.log(newUser)

    try{
        const user = await newUser.save();
        // send email to user
        //TODO SEND EMAIL TO USER FOR ACCOUNT CREATED

        res.status(201).json(user)
    }catch(err){
        res.status(500).json(err);
    }
}


// TODO CHANGE PASSWORD
export const changePassword = async (req, res) => {
    try {
        const user = await User.Doctor(req.user.id);
        if (!user) {
            return res.status(401).json("no user with that Account");
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.oldPassword &&
        res.status(401).json("Wrong password or username!");

        const ciphertext = CryptoJS.AES.encrypt(req.body.newPassword, process.env.SECRET_KEY).toString();
        const userUpdate = await User.findByIdAndUpdate(req.user.id, { password: ciphertext }, { new: true });
        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
}


// TODO RESET PASSWORD
export const resetPassword = async (req, res) => {
    try {
        const user = await User.Doctor(req.user.id);
        if (!user) {
            return res.status(401).json("no user with that Account");
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.oldPassword &&
        res.status(401).json("Wrong password or username!");

        //TODO SEND EMAIL TO USER FOR PASSWORD RESET
        

        const ciphertext = CryptoJS.AES.encrypt(req.body.newPassword, process.env.SECRET_KEY).toString();
        const userUpdate = await User.findByIdAndUpdate(req.user.id, { password: ciphertext }, { new: true });
        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
}



