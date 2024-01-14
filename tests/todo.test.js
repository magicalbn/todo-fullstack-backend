const mongoose = require("mongoose");
const request = require("supertest");
const TodoSchema = require("../models/todo-model");

const app = require("../app");
require("dotenv").config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /todo", () => {
    it("should return first 10 todo items", async () => {
        const res = await request(app).get("/todo");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should return 5 todo items", async () => {
        const res = await request(app).get("/todo?limit=5");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeLessThanOrEqual(5);
    });

    it("should return todo items with status done", async () => {
        const res = await request(app).get("/todo?status=done");
        expect(res.statusCode).toBe(200);
        const todos = res.body.data;
        todos.forEach((todo) => {
            expect(todo.status).toBe("done");
        });
    });
});

describe("POST /todo", () => {
    it("should create a todo item", async () => {
        const res = await request(app).post("/todo").send({
            title: "Jest test Todo",
            description: "Description for Jest test Todo",
            status: "todo",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.data).toBe("resource created");
    });

    it("should terminate with a failure response", async () => {
        const res = await request(app).post("/todo").send({
            title: "New Todo",
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.error.length).toBeGreaterThan(0);
    });
});

describe("PUT /todo", () => {
    it("should update a todo item", async () => {
        const recentItem = await TodoSchema.findOne({}).sort({
            created_at: -1,
        });
        let id = recentItem._id;
        const res = await request(app).put(`/todo/${id}`).send({
            title: "Jest test Todo Updated",
            description: "Description for Jest test Todo",
            status: "done",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBe("resource updated");

        const recentupdatedItem = await TodoSchema.findOne({}).sort({
            created_at: -1,
        });
        expect(recentupdatedItem.title).toBe("Jest test Todo Updated");
        expect(recentupdatedItem.status).toBe("done");
    });
});

describe("DELETE /todo/:id", () => {
    it("should delete a product", async () => {
        const recentItem = await TodoSchema.findOne({}).sort({
            created_at: -1,
        });
        const id = recentItem._id;
        const res = await request(app).delete(`/todo/${id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBe("resource deleted");
    });
});
