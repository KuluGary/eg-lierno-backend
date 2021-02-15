const { gql } = require('apollo-server-express');


module.exports = gql`
    scalar IntOrString
    
    extend type Query {   
        getAllItems: [Item]
        getAllWeapons: [Item]
        getAllVehicles: [Item]
        getAllArmor: [Item]
    }
    type Item {
        _id: ID
        name: String
        type: String
        image: ItemImage
        description: String
        properties: [ItemProperties]
    }
    type ItemImage {
        small: String
        large: String
    }
    type ItemProperties {
        key: String
        value: IntOrString
    }    
`