import mongoose from 'mongoose';

const PaymenSchema = mongoose.Schema({
    firstName: {type: String},
    lastName: {type:String},
    amount: {type:Number},
    Date: {
        type: Date,
        default: new Date()
    },
    Month:{type:Date}


});


export default PaymenSchema;
