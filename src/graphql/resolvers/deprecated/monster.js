const Monster = require("../../../models/monster");
const Controller = require("../../../controllers/monster");
const { ApolloError } = require('apollo-server-express');

module.exports = {
    getAllMonsters: () => Monster.find({ }),
    getMonstersById: (_, { monsterIds }) => {
        try {
            return Monster.find({ "_id": { $in: monsterIds } });
        } catch (error) {
            throw new ApolloError(`Error al recuperar los monstruos.`)
        }
    },
    getPublicMonsters: () => {
        try {
            return Controller.getPublicMonster();
        } catch (error) {
            throw new ApolloError(`Error al recuperar los monstruos.`)
        }
    }
}