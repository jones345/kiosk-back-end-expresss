import mongoose from 'mongoose';

const AddressSchema = mongoose.Schema({
    City:{type:String},
    Village:{type:String},
    Country:{type:String},
})

export default AddressSchema
