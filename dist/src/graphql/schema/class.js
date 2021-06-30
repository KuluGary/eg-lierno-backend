const { gql } = require('apollo-server-express');
module.exports = gql `
    extend type Query {   
        getAllClasses: [Class]
    }  

    type Class {
        _id: ID
        name: String
        description: String
        icon: String
        image: String
        data: ClassData
    } 
    type ClassData {
        hitDie: String
        primaryAbility: String
        saves: String
        subclassLevel: Int
    }
`;
//# sourceMappingURL=class.js.map