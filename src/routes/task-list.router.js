import { Router } from "express";

import { getAllTaskList, createTaskList, deleteTaskList, updateTaskList, updatePatchTaskList, getTaskListByStatus} from "../controllers/task-list.controller.js";

import { verifyToken } from "../middlewares/verify-token.js";

const router = Router();

router.get("/getAll/:userId", getAllTaskList)

router.get("/getAllByStatus", getTaskListByStatus)

router.post("/create/", createTaskList)

router.post("/createToken/", verifyToken, createTaskList)

router.delete("/delete/:id", deleteTaskList)

router.put("/update/:id", updateTaskList)

router.patch("/updatePatch/:id", updatePatchTaskList)

export default router;