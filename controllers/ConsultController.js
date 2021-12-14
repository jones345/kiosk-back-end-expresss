import consults from '../models/consults.js'

//ADD CONSULT
export const addConsult = async (req, res) => {
    const consultsm = req.body;
    const newConsults = new consults({...consultsm});

    // TODO ENCRYPT DATA AND SAVE
    try {
        await newConsults.save();
        res.status(201).json(newConsults);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

//GET ALL CONSULTS
export const getConsults = async (req, res) => {
    const query = req.query.new;
// TODO DECRYPT DATA AND IF USER IS ADMIN
    try {
      const users = query
        ? await consults.find().sort({ _id: -1 }).limit(25)
        : await consults.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
}


//GET CONSULT BY USER ID
export const getConsultByUserId = async (req, res) => {
    const query = req.query.new;
    const userId = req.params.userId;

    // TODO CHECK IF IS DOCTOR || USER || ADMIN
    try {
      const users = query
        ? await consults.find({  userid:userId}).sort({ _id: -1 }).limit(25)
        : await consults.find({userid:userId});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
}


//GET CONSULT BY DOC ID
export const getConsultByDocId = async (req, res) => {
    const query = req.query.new;
    const docId = req.params.docId;
// TODO CHECK IF IS DOCTOR || USER || ADMIN
    try {
      const users = query
        ? await consults.find({  docid:docId}).sort({ _id: -1 }).limit(25)
        : await consults.find({docId});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
}



