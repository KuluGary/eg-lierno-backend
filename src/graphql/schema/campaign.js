const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        campaigns(qs: String): [Campaign],
        campaign: Campaign
    }
    type Campaign {
        _id: ID
        name: String
        discordData: DiscordData
        players: [String]
        characters: [String]
        dm: String
        flavor: [CampaignFlavor]
        completed: Boolean
    }    
    type DiscordData {
        main: String
        privadas: [String]
    }
    type CampaignFlavor {
        game: String
        synopsis: String
        diary: [Diary]
    }
    type Diary {
        title: String
        description: String
    }
`