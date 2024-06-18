const mongoose = require('mongoose');
const moment=require("moment-timezone")
const messageSchema = mongoose.Schema({
    userName: String,
    message: {
        type: String,
        required: true
    },
    sentAt: {
        type: String,
        default: function() {
            return moment().tz("Asia/Kolkata").format("HH:mm:ss");
        }
    }
});

module.exports = mongoose.model("message", messageSchema);
