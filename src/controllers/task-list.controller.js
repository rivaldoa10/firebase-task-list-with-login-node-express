import * as models from "../models/task-list.js";

export const getAllTaskList = async(req, res)=>{
    const taskList = await models.getAllTaskList();
    res.json(taskList);
}

export const createTaskList = async (req, res)=>{
    const {title, dueDate, priority} = req.body;

    const product = await models.createTaskList({title, dueDate, priority});

    res.status(200).json(product);

}

export const deleteTaskList = async(req, res)=>{
    const {id} = req.params
    const deleted = await models.deleteTaskList(id);

    if (!deleted) {
        res.status(404).json({error: "Poducto no encontrado"});
    }

    res.status(204).send();
}

export const updateTaskList = async(req, res)=>{
    const {id} = req.params
    const {title, dueDate, priority, completed} = req.body;

    if(!title || !dueDate || !priority){
        return res.status(422).json({msg:"Title, Date and Priority are required"})
    }

    const updateTaskList = await models.updateTaskList(id, {title, dueDate, priority, completed});

    if (!updateTaskList) {
        return res.status(404).json({error:"Producto no encontrado"});
    }

    return res.status(200).json(updateTaskList);
}

export const updatePatchTaskList = async(req, res)=>{
    const {id} = req.params
    const {title, dueDate, priority, completed} = req.body;

    const data = {}

    if (title !== undefined) data.title =  title;
    if (dueDate !== undefined) data.dueDate =  dueDate;
    if (priority !== undefined) data.priority =  priority;
    if (completed !== undefined) data.completed =  completed;

    if(Object.keys(data).length===0){
        return res.status(422).json({msg:"No se proporcionaron campos para actualizar"})
    }

    const updatePatchTaskList = await models.updatePatchTaskList(id, data);

    if (!updatePatchTaskList) {
        return res.status(404).json({error:"Producto no encontrado"});
    }

    return res.status(200).json(updateTaskList);
}

export const getTaskListByStatus = async(req, res)=>{
    const {status} = req.query;
    if (!status) {
        res.status(404).json({msg: "No se encontraron resultado"});
    }
    
    const taskList = await models.getTaskListByStatus(status);
    return res.status(200).json(taskList);
}