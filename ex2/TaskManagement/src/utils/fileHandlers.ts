import fs from 'fs';
import { Task } from '../models/Tasks';

const dataPath = './src/data.json';

export const readTasks = (): Task[] => {
    const raw = fs.existsSync(dataPath) ? fs.readFileSync(dataPath,'utf-8') : '[]';
    return JSON.parse(raw);
};

export const writeTasks = (tasks : Task[]):void =>{
    fs.writeFileSync(dataPath,JSON.stringify(tasks, null, 2));
}