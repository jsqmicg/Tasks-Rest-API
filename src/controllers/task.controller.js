import Task from '../models/Task';
import { getPagination } from '../libs/getPagination';

export const findAllTasks = async (req, res) => {
    try {
        const { size, page } = req.query;
        const {limit, offset} = getPagination(page, size);
        const tasks = await Task.paginate({}, { offset, limit });
        res.json({
            totalItems: tasks.totalDocs,
            tasks: tasks.docs,
            totalPages: tasks.totalPages,
            currentPage: tasks.page - 1
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong retrieving the tasks'
        })
    }
};

export const createTask = async (req, res) => {

    if (!req.body.title) {
        return res.status(400).send({
            message:"Content propertie is required"
        })
    }
    
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description,
            done: req.body.done ? req.body.done : false
        });
        const taskSaved = await newTask.save();
        res.json(taskSaved);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong creating the task'
        })
    }
};

export const findOneTask = async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);
    try {
    
        if (!task) return res.status(404).json({message:`Task with id ${id} does not exist`})
    
        res.json(task); 
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving Task with id:${id}`
        })
    }
}

export const findDoneTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ done: true });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong retrieving the tasks'
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({
            message: "Task has been deleted"
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong deleting the tasks'
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        await Task.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            message: "Task has been updated"
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong updating the tasks'
        })
    }
}