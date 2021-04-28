const app = require('./app');
const logger = require('./utils/logger');
const socket = require("socket.io");

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    logger.info(`Server is running at http://192.168.1.51:${port}`)
    logger.info(`GraphQL playground at http://192.168.1.51:${port}/api/v2/graphql`);
})

const io = socket(server);
app.io = io;

io.on('connection', function (socket) {
    logger.info('Socket connected:', socket.client.id);    
});