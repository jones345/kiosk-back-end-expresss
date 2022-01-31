import doctorApplication from "../models/doctorApplication.js";
import Doctor from "../models/Doctor.js";
import {transporter,email} from '../Helpers/Mail.js'

export const apply =  async (req, res) => {

    const applicaion = req.body;
    const newapplicaion = new doctorApplication({...applicaion});
    try {
        await newapplicaion.save();
        res.status(201).json(newapplicaion);
    } catch (error) {
        res.status(409).json({message: error.message});
    }

    // const newapplicaion = new Doctor({
    //     FirstName: req.body.FirstName,
    //     LastName:req.body.LastName,
    //     DOB: req.body.DOB,
    //     Email:req.body.Email,
    //     occupation:req.body.occupation,
    //     gender:req.body.gender,
    //     bio:req.body.bio,
    //     profilePic: req.body.profilePic,
    //     NationalID:req.body.NationalID,
    //     WorkPermit:req.body.WorkPermit,
    //     phoneNumber:req.body.phoneNumber,
    //     maritalStatus: req.body.maritalStatus,
    //     Nationality:req.body.Nationality
    // })
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


export const reject = async (req, res) => {
    try {
        const oneApplication = await doctorApplication.findById(req.params.id);
        oneApplication.status = "Rejected";
        await oneApplication.save();
        res.json(oneApplication);
    }
    catch (err) {
        res.json({ message: err });
    }
}





