import mongoose from 'mongoose';

const EducationSchema = mongoose.Schema({
    School:{type:String},
    StartDate:{type:String},
    EndDate:{type:String},
    major:{type:String}

})

export default EducationSchema
