const Character = require("../../models/character");
const mongoose = require('mongoose');
const { UserInputError, ApolloError } = require('apollo-server-express');
const campaignController = require('../../controllers/campaign')

module.exports = {
    getAllCharacters: () => Character.find({}),
    getUserCharacters: (_, { _id }) => Character.find({ player: _id }),
    getUserCharactersAsDm: async (_, { _id }) => {
        try {            
            const campaigns = await campaignController.getCampaigns({ "dm": _id });
            const campaignCharacters = [...new Set(campaigns.map(campaign => campaign.characters).flat())];        
            
            return Character.find({
                $and: [{ "_id": { $in: campaignCharacters } }, { "player": { $ne: _id } }]
            });
        } catch (error) {
            throw new ApolloError(`Error al recuperar los personajes.`)
        }
    },
    getCharactersById: (_, { characterIds }) => {
        try {
            return Character.find({ "_id": { $in: characterIds } });
        } catch (error) {
            throw new ApolloError(`Error al recuperar los personajes.`)
        }
    },
    characters: (_, { qs }) => {
        try {
            if (qs) {
                return Character.find(JSON.parse(qs));
            }

            return Character.find({});
        } catch (error) {
            throw new ApolloError(`Error al recuperar los personajes.`)
        }
    },
    character: (_, { _id }) => {
        try {
            if (!mongoose.Types.ObjectId.isValid(_id)) {
                throw new UserInputError(`${_id} no es un ID de personaje válido.`)
            }

            return Character.findById(_id);
        } catch (error) {
            throw new ApolloError(`Error al recuperar el personaje.`)
        }
    },
}