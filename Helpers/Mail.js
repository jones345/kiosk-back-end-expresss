// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer"
import smtpTransport from "nodemailer-smtp-transport"

//  export const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: 'murl.goldner95@ethereal.email', // ethereal user
//         pass: 'W1trynzKwfJdq2CVA3', // ethereal password
//     },
// });


export const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'kioskhealthbw@gmail.com',
        pass: 'nfbvjmarhtahsqry'
    }
}));

//Murl Goldner
//   user: 'murl.goldner95@ethereal.email',
// pass: 'W1trynzKwfJdq2CVA3'
//kioskhealthbw@gmail.com
//nfbvjmarhtahsqry pass for google


export const email = "kioskhealthbw@gmail.com"



