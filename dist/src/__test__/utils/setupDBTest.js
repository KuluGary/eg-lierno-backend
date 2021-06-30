const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/lierno";
const setupTestDB = () => {
    beforeAll(async () => {
        await mongoose.connect(uri, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });
    beforeEach(async () => {
        await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
    });
    afterAll(async () => {
        await mongoose.disconnect();
    });
};
module.exports = setupTestDB;
//# sourceMappingURL=setupDBTest.js.map