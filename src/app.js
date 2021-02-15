require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const schemas = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers
})

const app = express();

server.applyMiddleware({ app, path: '/api/v2' })

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/auth', require('./routes/user.routes'))
app.use('/api/v1', require('./routes/faction.routes'))
app.use('/api/v1', require('./routes/notification.routes'))
app.use('/api/v1', require('./routes/character.routes'))
app.use('/api/v1', require('./routes/item.routes'))
app.use('/api/v1', require('./routes/monster.routes'))
app.use('/api/v1', require('./routes/race.routes'))
app.use('/api/v1', require('./routes/class.routes'))
app.use('/api/v1', require('./routes/location.routes'))
app.use('/api/v1', require('./routes/npc.routes'))
app.use('/api/v1', require('./routes/campaign.routes'))
app.use('/api/v1', require('./routes/spell.routes'))
app.use('/api/v1', require('./routes/logs.routes'))

module.exports = app;