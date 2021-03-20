const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { ApolloServer } = require('apollo-server-express');
const schemas = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers')
require('./db');

if (process.env.NODE_ENV === "development") {
    require('dotenv').config();
}

const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: ({ req }) => ({
        getUser: () => req.user
    }),

})

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))
app.use(cookieParser(process.env.SECRET_KEY));
app.use(passport.initialize());
app.use(passport.session());

require('./utils/passport')(passport);

server.applyMiddleware({ app, path: '/api/v2', cors: corsOptions })

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