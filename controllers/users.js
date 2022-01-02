import User from '../models/user.js';
import Doctor from "../models/Doctor.js";
import verify from "../controllers/verifyToken.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('name _id email');
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getUsersBySearch = async (req, res) => {
    const { searchQuery } = req.query;
    try {
        const users = await User.find({ _id: { $in: searchQuery.split(',')} });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//UPDATE USER
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// GET USER BY ID
export const getDocById = async (req, res) => {
    try {
        const user = await Doctor.findById(req.params.id);
        const { password, ...info } = user._doc;
        res.status(200).json(info);
      } catch (err) {
        res.status(500).json(err);
      }
}


// UPDATE USER BY ID
export const updateUserById = async (req, res) => {
    try {
        const user = await Doctor.findByIdAndUpdate(req.params.id, {$set:req.body}, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getAllDoc = async (req, res) => {
    const query = req.query.new;

    try {
      const users = query
        ? await Doctor.find().sort({ _id: -1 }).limit(250)
        : await Doctor.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
}


// GET DOCTOR STATUS
export const updateStatus = async (req, res)=>{
    try {
        const user = await Doctor.findByIdAndUpdate(req.params.id, {$set:req.body}, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}






