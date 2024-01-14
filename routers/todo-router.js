const express = require("express");
const { body, validationResult } = require("express-validator");

const todoController = require("../controllers/todo-controller");

let router = express.Router();

const validStatusValues = ["todo", "inprogress", "done"];

router.post(
    "/",
    body("title").isString().trim().notEmpty(),
    body("description").exists(),
    body("status").custom((value) => {
        if (!validStatusValues.includes(value)) {
            throw new Error(
                `Invalid status value. Allowed values: ${validStatusValues.join(
                    ", "
                )}`
            );
        } else return true;
    }),
    todoController.createTodo
);

router.delete("/:id", todoController.deleteTodo);

router.put(
    "/:id",
    body("title").isString().trim().notEmpty(),
    body("description").exists(),
    body("status").custom((value) => {
        if (!validStatusValues.includes(value)) {
            throw new Error(
                `Invalid status value. Allowed values: ${validStatusValues.join(
                    ", "
                )}`
            );
        } else return true;
    }),
    todoController.updateTodo
);

router.get("/", todoController.getToDos);

router.use("*", (req, res) => {
    res.json({
        message: "invalid path",
    });
});

module.exports = router;
