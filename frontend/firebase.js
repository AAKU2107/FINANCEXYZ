// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3xFPs_NJazzgJ0AfqgW9rZe_BPtrmJGo",
  authDomain: "financial-tracker-959ce.firebaseapp.com",
  projectId: "financial-tracker-959ce",
  storageBucket: "financial-tracker-959ce.firebasestorage.app",
  messagingSenderId: "1002293119867",
  appId: "1:1002293119867:web:7a6890c8d00efb56dd8bde",
  measurementId: "G-93V1JWZKSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication functions
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

// Firestore transaction functions
export const getTransactions = async (userId) => {
  try {
    const transactionsRef = collection(db, "users", userId, "transactions");
    const q = query(transactionsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      _id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return [];
  }
};

export const addTransaction = async (userId, tx) => {
  try {
    const transactionsRef = collection(db, "users", userId, "transactions");
    const docRef = await addDoc(transactionsRef, {
      ...tx,
      createdAt: serverTimestamp()
    });
    return {
      _id: docRef.id,
      ...tx,
      createdAt: new Date()
    };
  } catch (err) {
    console.error("Error adding transaction:", err);
    throw err;
  }
};

export const deleteTransaction = async (userId, transactionId) => {
  try {
    const transactionRef = doc(db, "users", userId, "transactions", transactionId);
    await deleteDoc(transactionRef);
    return true;
  } catch (err) {
    console.error("Error deleting transaction:", err);
    throw err;
  }
};

export const editTransaction = async (userId, transactionId, tx) => {
  try {
    const transactionRef = doc(db, "users", userId, "transactions", transactionId);
    await updateDoc(transactionRef, {
      ...tx,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.error("Error updating transaction:", err);
    throw err;
  }
};

// Export Firebase instances
export { app, auth, db };