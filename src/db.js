const mongoose = require('mongoose');
const logger = require('./utils/logger');
const db_name = process.env.NODE_ENV === "test" ? "test-lierno" : "lierno";

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + db_name;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.once('open', () => {
    logger.info(`MongoDB connected at ${uri}`);
})

module.exports = mongoose.connection;

