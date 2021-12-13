import mongoose from 'mongoose';

const EducationSchema = mongoose.Schema({
    Company:{type:String},
    StartDate:{type:String},
    EndDate:{type:String},

})

export default EducationSchema
