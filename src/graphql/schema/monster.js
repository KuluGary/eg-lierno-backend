const { gql } = require('apollo-server-express');

module.exports = gql`
     extend type Query {
        getAllMonsters: [Npc]      
        getMonstersById(monsterIds: [String]): [Npc],
        getPublicMonsters: [Npc]
     }     
 `