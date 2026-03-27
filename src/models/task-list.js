import { db } from "./firebase.js";
import { collection, getDocs, addDoc, doc, getDoc,deleteDoc, setDoc } from "firebase/firestore";


const taskListCollection = collection(db, "task-list");

export const getAllTaskList = async ()=>{
    try {
        const taskList = await getDocs(taskListCollection);
        return taskList.docs.map((doc)=>({id:doc.id, ...doc.data()}));
    } catch (error) {
        console.error(error);
        
    }
}

export const createTaskList = async(data)=>{
    console.log(data);
    try {
        const docRef = await addDoc(taskListCollection, data);    
        return {
            id:docRef,
            ...data
        }
    } catch (error) {
        console.error(error);
        
    }
}

export const deleteTaskList = async(id)=>{
    try {
        const taskListRef = doc(taskListCollection, id);
        const snapshop = await getDoc(taskListRef);

        if (!snapshop.exists()) {
            return false;
        }

        await deleteDoc(taskListRef);
        return true;
    } catch (error) {
        console.error(error);
    }
}

export const updateTaskList = async(id, taskList)=>{
    try {
        const taskListRef = doc(taskListCollection, id);
        const snapshop = await getDoc(taskListRef);

         if (!snapshop.exists()) {
            return false;
        }

        await setDoc(taskListRef, taskList);
        return {id, ...taskList};
    } catch (error) {
        console.error(error);
    }
}