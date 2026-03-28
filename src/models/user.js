import { db } from "./firebase.js";
import { collection, getDocs, addDoc, doc, getDoc,deleteDoc, setDoc, updateDoc, query, where } from "firebase/firestore";

const usersCollection = collection(db, "users");

export const createUser = async(email, passwordHash)=>{
    try {
        const docRef = await addDoc(usersCollection, {email, password: passwordHash});    
        return {
            id:docRef,
            email
        }
    } catch (error) {
        console.error(error);
        
    }
}

export const findUserByEmail = async(email)=>{
    try {
        const q = query(usersCollection, where("email", "==", email));
        const snapshop = await getDocs(q);
        if(!snapshop.empty){
            const doc = snapshop.docs[0];
            return {id: doc.id, ...doc.data()};
        }else{
            console.log("2");
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}