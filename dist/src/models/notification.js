const mongoose = require('mongoose');
const { Schema } = mongoose;
const notificationSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    forUser: {
        type: String,
        required: true
    },
    entityId: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
});
const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
//# sourceMappingURL=notification.js.map