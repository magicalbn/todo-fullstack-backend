const TodoSchema = require("../models/todo-model");
const { validationResult } = require("express-validator");

const createTodo = async (req, res) => {
    try {
        const validationErros = validationResult(req);
        if (!validationErros.isEmpty()) {
            return res.status(400).send({ error: validationErros.array() });
        }
        const { title, description, status } = req.body;

        await TodoSchema.create({ title, description, status });
        res.status(201).json({
            result: "success",
            data: "resource created",
        });
    } catch (e) {
        console.log("error", e);
        res.status(501).send(e?.message);
    }
};

const updateTodo = async (req, res) => {
    try {
        const validationErros = validationResult(req);
        if (!validationErros.isEmpty()) {
            return res.status(400).send({ error: validationErros.array() });
        }
        const { title, description, status } = req.body;

        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                result: "error",
                data: "invalid ID format",
            });
        }

        await TodoSchema.findOneAndUpdate(
            { _id: id },
            { title, description, status }
        );
        res.status(200).json({
            result: "success",
            data: "resource updated",
        });
    } catch (e) {
        console.log("error", e);
        res.status(501).send(e?.message);
    }
};

const getToDos = async (req, res) => {
    try {
        const { status } = req.query;
        //default pagination => first page with 10 entries
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const filter = status && status !== "all" ? { status } : {};

        const skip = (page - 1) * limit;

        const totalTodos = await TodoSchema.countDocuments(filter);
        const totalPages = Math.ceil(totalTodos / limit);

        const data = await TodoSchema.find(filter)
            .select("-__v")
            .skip(skip)
            .limit(limit)
            .sort({ created_at: -1 });

        res.json({
            result: "success",
            data: data,
            pagination: {
                page: page,
                limit: limit,
                total: totalTodos,
                pages: totalPages,
            },
        });
    } catch (e) {
        console.log("error", e);
        res.status(501).send(e?.message);
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).json({
                result: "error",
                data: "invalid ID format",
            });
        }

        const data = await TodoSchema.findByIdAndDelete(id);

        if (data) {
            res.json({
                result: "success",
                data: "resource deleted",
            });
        } else {
            res.status(404).json({
                result: "error",
                data: "resource not found",
            });
        }
    } catch (e) {
        console.log("error", e);
        res.status(501).send(e?.message);
    }
};

exports.getToDos = getToDos;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
