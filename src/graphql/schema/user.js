const { gql } = require('apollo-server-express');

module.exports = gql`
    type Query {   
        users: [User]
        user(_id: ID): User
    }
    type User {
        _id: ID
        isActive: Boolean
        username: String
        password: String
        campaigns: [String]
        metadata: [UserMetadata]
        roles: [String]
        role: String
    }
    type UserMetadata {
        first_name: String
        last_name: String
        email: String
        avatar: String
        location: String
        discordName: String
        discordId: String
        friendList: [String]
    }    
`