import mongoose from 'mongoose';
import MedicalHistorySchema from './medicalHitory.js'
import Address from './Address.js'
import PasswordHistory from "./PasswordHistory.js";
const userSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email: { type: String, required: true },
    password: { type: String},
    profilePic:{type:String,default:"https://cdn2.iconfinder.com/data/icons/men-avatars/33/man_5-512.png"},
    idNumber: {type: String},
    gender:{type: String},
    phone:{type:Number},
    medicalHistory: [MedicalHistorySchema],
    ShouldResetPassword:{type:Boolean,default:true},
    Address: [Address],
    otp:{type:Number},
    verified:{type:Boolean,default:false},
   //TODO PASSWORD HISTORY
    Joined: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('User', userSchema);
