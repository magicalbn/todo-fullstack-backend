const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/todo", (req, res) => {
    res.json({
        msg: "api here",
    });
});

app.use("*", (req, res) => {
    res.json({
        message: "routes available at /todo",
    });
});

module.exports = app;
