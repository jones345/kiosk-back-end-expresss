import mongoose from 'mongoose';

const ExprincesSchema = mongoose.Schema({
    Company:{type:String},
    StartDate:{type:String},
    EndDate:{type:String},

})

export default ExprincesSchema
