"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const Tasks_1 = require("../models/Tasks");
const fileHandlers_1 = require("../utils/fileHandlers");
const getAllTasks = (req, res) => {
    res.json((0, fileHandlers_1.readTasks)());
};
exports.getAllTasks = getAllTasks;
const getTaskById = (req, res) => {
    const task = (0, fileHandlers_1.readTasks)().find((t) => t.id === parseInt(req.params.id));
    task ? res.json(task) : res.status(404).json({ message: 'Task not found!!' });
};
exports.getTaskById = getTaskById;
const createTask = (req, res) => {
    var _a;
    const tasks = (0, fileHandlers_1.readTasks)();
    const newTask = new Tasks_1.Task(Date.now(), req.body.title, req.body.description, (_a = req.body.completed) !== null && _a !== void 0 ? _a : false);
    tasks.push(newTask);
    (0, fileHandlers_1.writeTasks)(tasks);
    res.status(201).json(newTask);
};
exports.createTask = createTask;
const updateTask = (req, res) => {
    const tasks = (0, fileHandlers_1.readTasks)();
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ message: 'Task not found !!' });
    }
    tasks[index] = Object.assign(Object.assign({}, tasks[index]), req.body);
    (0, fileHandlers_1.writeTasks)(tasks);
    res.json(tasks[index]);
};
exports.updateTask = updateTask;
const deleteTask = (req, res) => {
    const tasks = (0, fileHandlers_1.readTasks)();
    const updatedTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
    if (tasks.length === updatedTasks.length) {
        res.status(404).json({ message: 'Task not found !!' });
    }
    (0, fileHandlers_1.writeTasks)(updatedTasks);
    res.status(204).send();
};
exports.deleteTask = deleteTask;
