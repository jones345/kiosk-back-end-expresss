import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
// const CryptoJS = require("crypto-js");
import CryptoJS from 'crypto-js';
import Doctor from "../models/Doctor.js";
import {transporter,email} from '../Helpers/Mail.js'

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


        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken});
    } catch (err) {
        res.status(500).json(err);
    }
}


//TODO AUTHING USER ACTION AND LOGIN IN AND ACTIVITIES
// END POINTS FOR ALL LOGIN ACTIVATES



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
        await sendEmail(user)
        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken,userloggin:userlogginedIn });
    } catch (err) {
        res.status(500).json(err);
    }
}


export const signup = async (req, res) => {

    let ciphertext;
    const pass  = generatePassword();
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        idNumber: req.body.idNumber,
        gender:req.body.gender,
        password:  ciphertext = CryptoJS.AES.encrypt(pass, process.env.SECRET_KEY).toString(),

    });

    try{
        const user = await newUser.save();
        await generatedPassword(user)
        res.status(201).json(user)
    }catch(err){
        res.status(500).json(err);
    }
}




function generatePassword() {
    var length = 10,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const generatedPassword = async (user)=>{

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    let info = await transporter.sendMail({
        from: email, // sender address
        to: user.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text:  `Create Account Successfully`, // plain text body
        html: `Hello user`+ user.firstName + `` + user.lastName+ ` your password is ` + originalPassword + ` which will need to be changed upon login you can acess the system on`+ "<a>www.booking.com</a>", // html body
    });


}

export const signupdoc = async (req, res) => {

    let ciphertext;
    let pass = generatePassword();
    const newUser = new Doctor({
        Email: req.body.Email,
        password:  ciphertext = CryptoJS.AES.encrypt(pass, process.env.SECRET_KEY).toString(),
    });

    try{

        // check if user is present with email

        const User = await Doctor.findOne({ email: req.body.email });
        if (User) {
            return res.status(401).json("a user with that Account already exist");
        }

        else{
            const user = await newUser.save();
            await sendEmail(user)
            // send email to user
            //TODO SEND EMAIL TO USER FOR ACCOUNT CREATED

            res.status(201).json(user)

        }




    }catch(err){
        res.status(500).json(err);
    }
}

const sendEmail = async (user)=>{
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    let info = await transporter.sendMail({
        from: email, // sender address
        to: user.Email, // list of receivers
        subject: "Account Approved ✔😜", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Your Account Was Successfully  Approved and Created use following details to login to the system  (͠≖ ͜ʖ͠≖)👌</b>" + originalPassword + ' ' +' '+ user.Email, // html body
    });


}


// TODO CHANGE PASSWORD
export const changePassword = async (req, res) => {

    try {
        const user = await Doctor.findOne({Email:req.body.Email});
        if (!user) {
            return res.status(401).json("no user with that Account");
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password &&
        res.status(401).json("Wrong password or username!");

        const ciphertext = CryptoJS.AES.encrypt(req.body.newPassword, process.env.SECRET_KEY).toString();
        const userUpdate = await Doctor.findByIdAndUpdate(user._id, { password: ciphertext,ShouldResetPassword:false }, { new: true });
        await passwordChangedEmail(userUpdate)
        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
}

const passwordChangedEmail = async (user)=>{

    let info = await transporter.sendMail({
        from: email, // sender address
        to: user.Email, // list of receivers
        subject: "Password Changed successfully ✔", // Subject line
        text: `Password Successfully changed`, // plain text body
        html: `your password was successfully changed, if it was not you please report at ` + email, // html body
    });

}


// TODO RESET  PASSWORD

export const resetPasswordUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json("no user with that Account");
        }

        const password = generatePassword();
        const ciphertext = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
        const userUpdate = await User.findByIdAndUpdate(user._id, { password: ciphertext,ShouldResetPassword:false  }, { new: true });
         await SendNewPassword(userUpdate)

        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
}


const SendNewPassword =  async (user) => {

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    let info = await transporter.sendMail({
        from: email, // sender address
        to: user.email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `Password Successfully changed`, // plain text body
        html: `Hello user` + user.firstName + `` + user.lastName + ` your password is ` + originalPassword + ` which will need to be changed upon login you can acess the system on` + "<a>www.booking.com</a>", // html body
    });
}







// TODO RESET PASSWORD
export const resetPassword = async (req, res) => {
    try {
        const user = await Doctor.findOne({ Email: req.body.Email });
        if (!user) {
            return res.status(401).json("no user with that Account");
        }

        const password = generatePassword();
        const ciphertext = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
        const userUpdate = await Doctor.findByIdAndUpdate(user._id, { password: ciphertext,ShouldResetPassword:true }, { new: true });
        await docpassemail(userUpdate)

        res.status(200).json(userUpdate);
    } catch (err) {
        res.status(500).json(err);
    }
}

const docpassemail = async (user)=>{

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    let info = await transporter.sendMail({
        from: email, // sender address
        to: user.Email, // list of receivers
        subject: "Password Successfully changed ✔", // Subject line
        text: `Password Successfully changed`, // plain text body
        html: `Hello user  your password is ` + originalPassword + ` which will need to be changed upon login you can acess the system on` + "<i>www.booking.com</i>", // html body
    });
}



