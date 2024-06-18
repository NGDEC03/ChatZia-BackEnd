const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    userName: String,
    message: {
        type: String,
        required: true
    },
    sentAt: {
        type: String,
        default: function() {
            return new Date().toLocaleTimeString();
        }
    }
});

module.exports = mongoose.model("message", messageSchema);
