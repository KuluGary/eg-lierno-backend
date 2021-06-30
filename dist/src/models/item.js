const mongoose = require('mongoose');
const { Schema } = mongoose;
const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    type: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    image: {
        type: Object,
        required: false,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false
    },
    properties: {
        type: Array,
        required: false,
        unique: false
    }
}, {
    timestamps: true,
});
const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
//# sourceMappingURL=item.js.map