import mongoose from 'mongoose';

const doctorApplicationSChema = mongoose.Schema({
    FirstName:{type:String},
    LastName:{type:String},
    Age:{type:String},
    Email:{type:String},
    MediclaCertificate:{data: Buffer,contentType: String},
    BHPCT:{data: Buffer,contentType: String},
    NationalID:{data: Buffer,contentType: String},
    WorkPermit:{data: Buffer,contentType: String},
    phoneNumber:{type:String},
    gender:{type:String},
    city:{type:String},
    Country:{type:String},
    address:{type:String},
    occupation:{type:String},
    ShouldResetPassword:{type:Boolean,default:true},
    maritalStatus:{type:String},
    profilePic:{data: Buffer,contentType: String},
    bio:{type:String},
    status:{type:String,default:"pending"},
    password:{type:String,default:"Password@123"}

})

export default mongoose.model('DoctorApplication',doctorApplicationSChema)
