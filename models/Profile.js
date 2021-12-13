import mongoose from 'mongoose';


const ProfileSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type:String},
    idNumber: {type:Number},
    address: {type:String},
    age: {type:Number},
});


export default ProfileSchema;
