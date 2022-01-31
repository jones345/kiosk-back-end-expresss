import mongoose from 'mongoose';
import ExprincesSchema from './Exprinces.js'
import EducationSchema from './Education.js'
import PaymenSchema from "./Payment.js";
import PasswordHistory from "./PasswordHistory.js";
import LocationSchema from "./Location.js";

const DoctorSchema = mongoose.Schema({
    FirstName:{type:String},
    LastName:{type:String},
    Age:{type:String},
    DOB:{type:String},
    Email:{type:String},
    MediclaCertificate:{type:String},
    BHPCT:{type:String},
    NationalID:{type:String},
    WorkPermit:{type:String},
    phoneNumber:{type:String},
    gender:{type:String},
    occupation:{type:String},
    ShouldResetPassword:{type:Boolean,default:true},
    maritalStatus:{type:String},
    profilePic:{type:String},
    bio:{type:String},
    online:{type:Boolean,default:false},
    password:{type:String},
    Nationality:{type:String},
    ProfileEdited:{type:Boolean,default:false},
    Exprince:[ExprincesSchema],
    //TODO PASSWORD HISTORY
    medicalType:{type:String},
    Education:[EducationSchema],
    longitude:{type:Number},
    latitude:{type:Number},
    Country:{type:String},
    city:{type:String},
    plot:{type:String},
    Status:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false},
    Payment:[PaymenSchema],
    Specialize:{type:String,default:"General"},
    Joined: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('Doctor', DoctorSchema);
