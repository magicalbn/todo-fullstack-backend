const mongoose = require("mongoose");
require("dotenv").config();

function mongooseConnectDB() {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("error connecting to the database", err));
}

module.exports = mongooseConnectDB;
