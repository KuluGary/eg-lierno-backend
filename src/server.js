const app = require("./app");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const socket = require("socket.io");
let server;

const port = process.env.PORT || 3001;
const db_name = process.env.NODE_ENV === "test" ? "test-lierno" : "lierno";
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/" + db_name;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    logger.info(`MongoDB connected at ${uri}`);
    server = app.listen(port, () =>
      logger.info(`Server is running at ${process.env.SERVER_URL}`)
    );
  });

module.exports = mongoose.connection;
