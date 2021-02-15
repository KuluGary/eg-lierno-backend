const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        getAllSpells: [Spell]
    }
    type Spell {
        _id: ID
        name: String
        stats: SpellStats
    }
    type SpellStats {
        level: Int
        school: String
        castingTime: String
        range: String
        components: SpellComponents
        duration: String
        description: String
    }
    type SpellComponents {
        type: String
        description: String
    }
 `