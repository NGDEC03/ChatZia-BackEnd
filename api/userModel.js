const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

// Ensure the unique index is created
userSchema.index({ userName: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
