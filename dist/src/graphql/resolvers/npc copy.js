const Npc = require("../../models/npc");
const Controller = require("../../controllers/npc");
const { ApolloError } = require('apollo-server-express');
module.exports = {
    getAllNpcs: () => Npc.find({}),
    getNpcsById: (_, { npcIds }) => {
        try {
            return Npc.find({ "_id": { $in: npcIds } });
        }
        catch (error) {
            throw new ApolloError(`Error al recuperar los personajes.`);
        }
    },
    getPublicNpcs: () => {
        try {
            return Controller.getPublicNpc();
        }
        catch (e) {
            throw new ApolloError(`Error al recuperar los personajes.`);
        }
    }
};
//# sourceMappingURL=npc%20copy.js.map