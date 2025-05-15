import { Request, Response } from "express";
import { Task } from "../models/Tasks";
import { readTasks, writeTasks } from "../utils/fileHandlers";

export const getAllTasks = (req: Request, res: Response) => {
    res.json(readTasks());
};

export const getTaskById = (req: Request,res: Response) => {
    const task = readTasks().find((t) => t.id === parseInt(req.params.id));
    task ? res.json(task) : res.status(404).json({message:'Task not found!!'});
};

export const createTask = (req: Request, res: Response) => {
    const tasks =  readTasks();
    const newTask = new Task(
        Date.now(),
        req.body.title,
        req.body.description,
        req.body.completed ?? false
    );
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
};

export const updateTask = (req:Request,res:Response)=>{
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) { 
        res.status(404).json({message:'Task not found !!'});
    }
    tasks[index] = {...tasks[index], ...req.body};
    writeTasks(tasks);
    res.json(tasks[index]);
};

export const deleteTask =(req:Request,res:Response)=>{
    const tasks = readTasks();
    const updatedTasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
    if(tasks.length === updatedTasks.length){
       res.status(404).json({message : 'Task not found !!'});
    }
    writeTasks(updatedTasks);
    res.status(204).send();
};
