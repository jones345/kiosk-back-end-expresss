import mongoose from 'mongoose';
import ExprincesSchema from './Exprinces.js'
import EducationSchema from './Education.js'
const DoctorSchema = mongoose.Schema({
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
    online:{type:Boolean,default:false},
    password:{type:String,default:"Password@123"},
    Exprince:[ExprincesSchema],
    Education:[EducationSchema],
    Joined: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('Doctor', DoctorSchema);
