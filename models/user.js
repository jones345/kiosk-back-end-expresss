import mongoose from 'mongoose';
import MedicalHistorySchema from './medicalHitory.js'
import Address from './Address.js'
const userSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email: { type: String, required: true },
    password: { type: String,required: true  },
    profilePic:{type:String,default:"https://cdn2.iconfinder.com/data/icons/men-avatars/33/man_5-512.png"},
    idNumber: {type: String},
    gender:{type: String},
    loggined:{type:Boolean,default:false},
    isAdmin:{type:Boolean,required:true,default:false},
    medicalHistory: [MedicalHistorySchema],
    Address: [Address],
    Joined: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('User', userSchema);
