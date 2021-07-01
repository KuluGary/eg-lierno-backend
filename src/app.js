const express = require("express");
const cors = require("cors");
require("reflect-metadata");
const passport = require("passport");
const redis = require("redis");
const session = require("express-session");
const multer = require("multer");
const { ApolloServer } = require("apollo-server-express");
const { buildSchema } = require("type-graphql");
const { HelloResolver } = require("./graphql/resolvers/hello");
const { UserResolver } = require("./graphql/resolvers/user");
const { CharacterResolver } = require("./graphql/resolvers/character");
const { CampaignResolver } = require("./graphql/resolvers/campaign");
const { SpellResolver } = require("./graphql/resolvers/spell");
const { ItemResolver } = require("./graphql/resolvers/item");
const { NpcResolver } = require("./graphql/resolvers/npc");
const { MonsterResolver } = require("./graphql/resolvers/monster");
const logger = require("./utils/logger");

let app = express();

const main = async () => {
    if (process.env.NODE_ENV !== "production") {
        require("dotenv").config();
    } else {        
        app.set("trust proxy", 1);
    }
        
    const RedisStore = require("connect-redis")(session);
    const redisClient = redis.createClient({
        host: process.env.REDIS_HOSTNAME,
        port: process.env.REDIS_PORT
    });

    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                HelloResolver,
                UserResolver,
                CharacterResolver,
                CampaignResolver,
                ItemResolver,
                SpellResolver,
                NpcResolver,
                MonsterResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    const corsOptions = {
        origin: process.env.CLIENT_URL,
        optionsSuccessStatus: 200,
        credentials: true,
    };
    app.use(cors(corsOptions));

    const multerMiddleware = multer({
        storage: multer.memoryStorage(),
    });

    app.use(
        session({
            secret: process.env.SECRET_KEY,
            name: "qid",
            resave: false,
            saveUninitialized: false,
            store: new RedisStore({
                client: redisClient,
                disableTouch: true,
                disableTTL: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 yrs
                httpOnly: true,
                sameSite: "none",
                secure: process.env.NODE_ENV !== "development", // cookie only works in https
            },
        }),
    );
    app.use(express.json({ limit: "50mb" }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(
        multerMiddleware.fields([
            { name: "original", maxCount: 1 },
            { name: "crop", maxCount: 1 },
        ]),
    );

    require("./utils/passport")(passport);

    server.applyMiddleware({ app, path: "/api/v2", cors: corsOptions });

    app.use("/api/v1/auth", require("./routes/user.routes"));
    app.use("/api/v1", require("./routes/faction.routes"));
    app.use("/api/v1", require("./routes/notification.routes"));
    app.use("/api/v1", require("./routes/character.routes"));
    app.use("/api/v1", require("./routes/item.routes"));
    app.use("/api/v1", require("./routes/monster.routes"));
    app.use("/api/v1", require("./routes/race.routes"));
    app.use("/api/v1", require("./routes/class.routes"));
    app.use("/api/v1", require("./routes/location.routes"));
    app.use("/api/v1", require("./routes/npc.routes"));
    app.use("/api/v1", require("./routes/campaign.routes"));
    app.use("/api/v1", require("./routes/spell.routes"));
    app.use("/api/v1", require("./routes/logs.routes"));
    app.use("/api/v1", require("./routes/image.routes"));
};

main();

module.exports = app;
