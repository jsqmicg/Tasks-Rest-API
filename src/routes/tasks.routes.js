import { Router } from 'express';
import * as tasksCtrlr from '../controllers/task.controller';

const router = Router();

router.get("/", tasksCtrlr.findAllTasks);
router.get("/done", tasksCtrlr.findDoneTasks);
router.get("/:id", tasksCtrlr.findOneTask);

router.post("/", tasksCtrlr.createTask);

router.delete("/:id", tasksCtrlr.deleteTask);

router.put("/:id", tasksCtrlr.updateTask);


export default router