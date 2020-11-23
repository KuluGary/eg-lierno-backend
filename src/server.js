const app = require('./app');
const connection = require('./db');
const socket = require("socket.io");

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log('Server running on port ' + port);
})

connection.once('open', () => {
    console.log("DB connected");
})

const io = socket(server);
app.io = io;

io.on('connection', function (socket) {
    console.log('Socket connected:', socket.client.id);    
});

