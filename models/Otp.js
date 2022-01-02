import mongoose from 'mongoose';

const OtpSchema = mongoose.Schema({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    otp: DataTypes.STRING,
    expiration_time: DataTypes.DATE,
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.fn('now')
    }     
    }, {
        tableName: 'OTP'
    
});

export default mongoose.model('Otp', OtpSchema);