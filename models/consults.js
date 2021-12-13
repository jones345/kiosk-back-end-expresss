import mongoose from 'mongoose';

const consultsSchema = mongoose.Schema({
    doctorid:{type:String},
    doctorname:{type:String},
    userid:{type:String},
    patientNames:{type:String},
    symptoms:{type:String},
    treatment:{type:String},
    timestamp: {
        type: Date,
        default: new Date()
    }
})


const consult =mongoose.model('Consults', consultsSchema);
export default consult
