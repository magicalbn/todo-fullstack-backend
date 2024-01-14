const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

//routes
const todoRoutes = require("./routers/todo-router");
app.use("/todo", todoRoutes);

app.use("*", (req, res) => {
    res.json({
        message: "routes available at /todo",
    });
});

module.exports = app;
