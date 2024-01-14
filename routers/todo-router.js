const express = require("express");
const { body, validationResult } = require("express-validator");

const todoController = require("../controllers/todo-controller");

let router = express.Router();

router.post("/", todoController.createTodo);

router.delete("/:id", todoController.deleteTodo);

router.patch("/:id", todoController.updateTodo);

router.get("/", todoController.getToDos);

router.use("*", (req, res) => {
    res.json({
        message: "invalid path",
    });
});

module.exports = router;
