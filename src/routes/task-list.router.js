import { Router } from "express";

import { getAllTaskList, createTaskList, deleteTaskList, updateTaskList} from "../controllers/task-list.controller.js";

const router = Router();

router.get("/getAll", getAllTaskList)

router.post("/create/", createTaskList)

router.delete("/delete/:id", deleteTaskList)

router.put("/update/:id", updateTaskList)

export default router;