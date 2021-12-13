import mongoose from 'mongoose';

const MedicalHistorySchema = mongoose.Schema({
    TB:{type:Boolean,default:false},
    ChroniceIllness:{type:Boolean,default:false},
    ChroniceSugies:{type:Boolean,default:false},

})

export default MedicalHistorySchema
