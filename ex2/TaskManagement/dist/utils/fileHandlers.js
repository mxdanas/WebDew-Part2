"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTasks = exports.readTasks = void 0;
const fs_1 = __importDefault(require("fs"));
const dataPath = './src/data.json';
const readTasks = () => {
    const raw = fs_1.default.existsSync(dataPath) ? fs_1.default.readFileSync(dataPath, 'utf-8') : '[]';
    return JSON.parse(raw);
};
exports.readTasks = readTasks;
const writeTasks = (tasks) => {
    fs_1.default.writeFileSync(dataPath, JSON.stringify(tasks, null, 2));
};
exports.writeTasks = writeTasks;
