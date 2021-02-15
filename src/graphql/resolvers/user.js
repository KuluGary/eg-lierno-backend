const User = require("../../models/user")
const mongoose = require('mongoose');
const { UserInputError } = require('apollo-server-express');

module.exports = {
    users: (root, args, context, info) => {
        return User.find({});
    },
    user: (root, { _id }, context, info) => {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            throw new UserInputError(`${_id} no es un ID de usuario válido.`)
        }

        return User.findById(_id);
    }
}