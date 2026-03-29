import { db } from "./firebase.js";
import { collection, getDocs, addDoc, doc, getDoc,deleteDoc, setDoc, updateDoc, where, query } from "firebase/firestore";


const taskListCollection = collection(db, "task-list");

export const getAllTaskList = async (userId)=>{
    try {
        const q = query(taskListCollection, where("userId", "==", userId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({id: doc.id,...doc.data()}));
    } catch (error) {
        console.error(error);
        
    }
}

export const createTaskList = async(data)=>{
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

export const updatePatchTaskList = async(id, taskList)=>{
    try {
        const taskListRef = doc(taskListCollection, id);
        const snapshop = await getDoc(taskListRef);

         if (!snapshop.exists()) {
            return false;
        }

        //await setDoc(taskListRef, taskList, {merge:true});
        await updateDoc(taskListRef, taskList);
        return {id, ...taskList};
    } catch (error) {
        console.error(error);
    }
}

export const getTaskListByStatus = async(status, userId)=>{
    try {
        let isCompleted = false;
        if (status == "true" || status == "True") {
            isCompleted = true;             
        }

        const q = query(taskListCollection, where("completed", "==",  isCompleted),where("userId", "==", userId)
);
        
        const snapshop = await getDocs(q);
        return snapshop.docs.map((doc)=>({
            id:doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.log(error);
    }
}