const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "public")))

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/lierno';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("DB connected");
})

app.use('/api/v1', require('./routes/user.routes'))
app.use('/api/v1', require('./routes/character.routes'))
app.use('/api/v1', require('./routes/item.routes'))
app.use('/api/v1', require('./routes/monster.routes'))
app.use('/api/v1', require('./routes/race.routes'))
app.use('/api/v1', require('./routes/class.routes'))
app.use('/api/v1', require('./routes/location.routes'))
app.use('/api/v1', require('./routes/npc.routes'))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "public", "index.html"));
});

app.listen(port, () => {
    console.log('server running on port ' + port);
})