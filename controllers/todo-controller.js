const createTodo = async (req, res) => {
    res.json({ msg: "create todo" });
};

const updateTodo = async (req, res) => {
    res.json({ msg: "update todo" });
};

const getToDos = async (req, res) => {
    res.json({ msg: "get todo" });
};

const deleteTodo = async (req, res) => {
    res.json({ msg: "delete todo" });
};

exports.getToDos = getToDos;
exports.createTodo = createTodo;
exports.updateTodo = updateTodo;
exports.deleteTodo = deleteTodo;
