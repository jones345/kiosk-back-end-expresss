import mongoose from 'mongoose';

const LocationSchema = mongoose.Schema({
    longitude:{type:Number},
    latitude:{type:Number},
    Country:{type:String},
    city:{type:String},
    plot:{type:String}
});

export default LocationSchema;
