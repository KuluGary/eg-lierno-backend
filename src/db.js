const mongoose = require('mongoose');
const db_name = process.env.NODE_ENV === "test" ? "test-lierno" : "lierno";

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + db_name;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

module.exports = mongoose.connection;

