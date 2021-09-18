const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const app = express();
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));

const multerMiddleware = multer({
  storage: multer.memoryStorage(),
});

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser(process.env.SECRET_KEY));
app.use(
  multerMiddleware.fields([
    { name: "original", maxCount: 1 },
    { name: "crop", maxCount: 1 },
  ]),
);

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
app.use("/api/v1", require("./routes/image.routes"));
app.use("/api/v1", require("./routes/logs.routes"));

module.exports = app;
