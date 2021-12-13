import doctorApplication from "../models/doctorApplication.js";

export const apply =  async (req, res) => {

    const application =  new doctorApplication({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Age: req.body.Age,
        NationalID: req.body.NationalID,
        WorkPermit: req.body.WorkPermit,
        phoneNumber: req.body.phoneNumber,
        gender:req.body.gender,
        city:req.body.city,
        Country:req.body.Country,
        address:req.body.address,
        bio:req.body.bio,
        occupation:req.body.occupation,
        maritalStatus:req.body.maritalStatus,
        profilePic:req.body.profilePic,
        MediclaCertificate:req.body.MediclaCertificate,
        BHPCT:req.body.BHPCT,

    })
    console.log('------------->>>>>.',application)

    try {
        const savedApplication = await application.save();
        res.json(savedApplication);
    }
    catch (err) {
        res.json({ message: err });
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




