const mongoose = require('mongoose');
const { Schema } = mongoose;
const LocationSchema = new Schema({
    bounds: {
        type: Array,
        required: true
    },
    minZoom: {
        type: Number,
        required: true
    },
    maxZoom: {
        type: Number,
        required: true
    },
    defaultZoom: {
        type: Number,
        required: true
    },
    center: {
        type: Array,
        required: true
    },
    background: {
        type: String
    },
    locales: {
        type: Array,
        required: true
    }
}, {
    timestamps: true,
});
const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;
//# sourceMappingURL=location.js.map