import doctorApplication from "../models/doctorApplication.js";
import nodemailer from'nodemailer';
export const apply =  async (req, res) => {

    const applicaion = req.body;
    const newapplicaion = new doctorApplication({...applicaion});
    try {
        await newapplicaion.save();
        res.status(201).json(newapplicaion);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}


export const getAll = async (req, res) => {
    try {
        const allApplications = await doctorApplication.find();
        res.json(allApplications);
    }
    catch (err) {
        res.json({ message: err });
    }
}

export const getOne = async (req, res) => {
    try {
        const oneApplication = await doctorApplication.findById(req.params.id);
        res.json(oneApplication);
    }
    catch (err) {
        res.json({ message: err });
    }
}


//APPROVE APPLICATION AND SEND EMAIL

// #   username: nanotechbitri@gmail.com
//   #   password: bojwkmkmhaskkbja
//   #   host: smtp.gmail.com
//   #   port: 587
//   #   secure: false
//   #   requireTLS: true
//   #   auth: {
//   #       user: '


//TODO SEND EMAIL AND SAVE APPLICATION TO DOCTORS TABLE
export const approve = async (req, res) => {
    try {
        const oneApplication = await doctorApplication.findById(req.params.id);
        oneApplication.status = "Approved";
        await oneApplication.save();
        res.json(oneApplication);
    }
    catch (err) {
        res.json({ message: err });
    }
}





