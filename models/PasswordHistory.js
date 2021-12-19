import mongoose from 'mongoose';

const PasswordHistorySchema = mongoose.Schema({
    password: {type: String,required:true},
    Date: {
        type: Date,
        default: new Date()
    },



});


export default PasswordHistorySchema;
